import { ContractOrmMapper } from '@domain-repositories/contract/contract.orm-mapper';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { PaymentTransactionOrmMapper } from '@domain-repositories/payment-transaction/payment-transaction.orm-mapper';
import { PaymentTransactionRepository } from '@domain-repositories/payment-transaction/payment-transaction.repository';
import { UpdateContractPaymentTransactionCommand } from '@domains/contract/commands/update-contract-payment-transaction/update-contract-payment-transaction.command';
import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { ReverseInnopayTransactionCommand } from '@domains/innopay-transaction/commands/reverse-innopay-transaction/reverse-innopay-transaction.command';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { CashInFailedEvent } from '@domains/payment-transaction/domain/events/events';
import { PaymentInvoiceType } from '@domains/payment-transaction/domain/types';
import { PaymentTransactionNotActiveProblem } from '@domains/payment-transaction/problems/payment-transaction-not-active.problem';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { PubSubService, PubSubTrigger } from '@modules/graphql-subscriptions/pub-sub.service';
import { ContractPubSubEvent, PaymentTransactionPubSubEvent } from '@modules/graphql-subscriptions/types';
import { RecurringPaymentLastWithdrawFailureEvent } from '@modules/notifications/services/recurring-payment-last-withdraw-failure/recurring-payment-last-withdraw-failure.event';
import { RecurringPaymentWithdrawFailureEvent } from '@modules/notifications/services/recurring-payment-withdraw-failure/recurring-payment-withdraw-failure.event';
import { RecurringPaymentWithdrawSuccessEvent } from '@modules/notifications/services/recurring-payment-withdraw-success/recurring-payment-withdraw-success.event';
import { Process, Processor } from '@nestjs/bull';
import { BadGatewayException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InnopayCashInService } from '@third-parties/innopay-payment/src/services/innopay-cash-in.service';
import { Job } from 'bull';

import { PaymentBulls, PaymentTransactionProcess, TransactionJobPayload } from '../types';

@Processor(PaymentBulls.PAYMENT_TRANSACTION)
export class PaymentTransactionCashInProcessor {
  constructor(
    private readonly innopayCashInService: InnopayCashInService,
    private readonly paymentTransactionRepository: PaymentTransactionRepository,
    private readonly contractRepository: ContractRepository,
    private readonly pubSubService: PubSubService,
    private readonly eventEmitter: EventEmitter2,
    private readonly unitOfWork: UnitOfWork,
    private commandBus: CommandBus,
    private readonly configService: ConfigService,
  ) {}

  @Process(PaymentTransactionProcess.CASH_IN)
  async handle(job: Job<TransactionJobPayload>) {
    const { paymentTransactionId } = job.data;
    const isProduction = this.configService.get<string>('nodeEnv') === 'production';

    const trxId = await this.unitOfWork.start();

    let customerReference: string | undefined;

    try {
      const [paymentTransaction, contract] = await Promise.all([
        this.paymentTransactionRepository.findOneById(paymentTransactionId, trxId),
        this.contractRepository.findOneByPaymentTransactionId(paymentTransactionId, trxId),
      ]);

      if (!paymentTransaction) {
        throw new NotFoundException('Payment transaction not found');
      }
      if (!contract) {
        throw new NotFoundException('Contract not found');
      }
      if (!paymentTransaction.isCashInActive()) {
        throw new PaymentTransactionNotActiveProblem();
      }

      const card = paymentTransaction.senderCardOrFail;

      let completeTransactionResult = false;

      const result = await this.innopayCashInService.paySavedCard({
        amount: isProduction ? paymentTransaction.totalAmountPayable : 999999,
        cardId: card.cnpCardId,
        userLogin: card.userId.value,
        userId: card.cnpUserId,
        paymentTarget: paymentTransaction.contractId.value,
      });

      if (!result.payResult) {
        await this.commandBus.execute<ReverseInnopayTransactionCommand>(
          new ReverseInnopayTransactionCommand(result.customerReference),
        );

        throw new BadGatewayException('Something went wrong');
      }

      customerReference = result.customerReference;
      completeTransactionResult = result.payResult;

      if (!customerReference) {
        throw new BadGatewayException('Customer reference exist');
      }

      if (completeTransactionResult) {
        paymentTransaction.cashInSuccess(card.cardMeta, { customerReference });
      } else {
        paymentTransaction.failure(PaymentInvoiceType.WITHDRAW, card.cardMeta, { customerReference });
      }

      contract.endPending();

      await Promise.all([
        this.paymentTransactionRepository.save(paymentTransaction, trxId),
        this.contractRepository.save(contract, trxId),
      ]);

      await this.unitOfWork.execute(trxId);

      if (paymentTransaction.isRecurring) {
        this.eventEmitter.emit(
          RecurringPaymentWithdrawSuccessEvent.eventName,
          RecurringPaymentWithdrawSuccessEvent.create({
            recipientId: paymentTransaction.senderId,
            contractId: paymentTransaction.contractId,
            paymentTransactionId: paymentTransaction.id,
          }),
        );
      }

      this.commandBus.execute<UpdateContractPaymentTransactionCommand>(
        new UpdateContractPaymentTransactionCommand(paymentTransaction.contractId),
      );
      this.publishPaymentTransaction(paymentTransaction);
      this.publishContract(contract);
    } catch (error) {
      await this.unitOfWork.rollback(trxId);
      const [paymentTransaction, contract] = await Promise.all([
        this.paymentTransactionRepository.findOneById(paymentTransactionId),
        this.contractRepository.findOneByPaymentTransactionId(paymentTransactionId),
      ]);

      if (paymentTransaction && contract && customerReference) {
        const card = paymentTransaction.senderCardOrFail;

        paymentTransaction.failure(
          PaymentInvoiceType.WITHDRAW,
          card.cardMeta,
          { customerReference },
          JSON.stringify(error),
        );
        contract.endPending();

        await Promise.all([
          this.paymentTransactionRepository.save(paymentTransaction),
          this.contractRepository.save(contract),
        ]);

        this.publishContract(contract);

        this.eventEmitter.emit(CashInFailedEvent.eventName, CashInFailedEvent.create({ paymentTransaction }));

        if (paymentTransaction.isRecurring) {
          this.eventEmitter.emit(
            RecurringPaymentWithdrawFailureEvent.eventName,
            RecurringPaymentWithdrawFailureEvent.create({ recipientId: paymentTransaction.senderId }),
          );
        }

        if (paymentTransaction.isLastPayment) {
          this.eventEmitter.emit(
            RecurringPaymentLastWithdrawFailureEvent.eventName,
            RecurringPaymentLastWithdrawFailureEvent.create({
              recipientId: paymentTransaction.recipientId,
              contractId: paymentTransaction.contractId,
            }),
          );
        }
      }

      throw error;
    }
  }

  async publishPaymentTransaction(paymentTransaction: PaymentTransactionEntity) {
    const mapper = new PaymentTransactionOrmMapper(PaymentTransactionEntity);
    const ormPaymentTransaction = await mapper.toOrmEntity(paymentTransaction);

    this.pubSubService.publish(PubSubTrigger.UPDATE_PAYMENT_TRANSACTION, {
      paymentTransaction: ormPaymentTransaction,
      cardOwnerId: paymentTransaction.senderId.value,
      event: PaymentTransactionPubSubEvent.UPDATED,
    });
  }

  private async publishContract(contract: ContractEntity) {
    const mapper = new ContractOrmMapper(ContractEntity);
    const ormContract = await mapper.toOrmEntity(contract);

    this.pubSubService.publish(PubSubTrigger.UPDATE_CONTRACT, {
      contract: ormContract,
      event: ContractPubSubEvent.UPDATED,
    });
  }
}
