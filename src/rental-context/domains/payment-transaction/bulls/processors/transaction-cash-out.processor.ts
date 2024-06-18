import { ContractOrmMapper } from '@domain-repositories/contract/contract.orm-mapper';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { PaymentTransactionOrmMapper } from '@domain-repositories/payment-transaction/payment-transaction.orm-mapper';
import { PaymentTransactionRepository } from '@domain-repositories/payment-transaction/payment-transaction.repository';
import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { InnopayCardEntity } from '@domains/innopay-card/domain/entities/innopay-card.entity';
import { CompleteCashOutInnopayTransactionProducer } from '@domains/innopay-transaction/bulls/sqs-producers/complete-cash-out-innopay-transaction.producer';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { PaymentInvoiceType } from '@domains/payment-transaction/domain/types';
import { PaymentTransactionNotActiveProblem } from '@domains/payment-transaction/problems/payment-transaction-not-active.problem';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { InnopayServiceBadRequestProblem } from '@infrastructure/problems/innopay-service-bad-request.problem';
import { PubSubService, PubSubTrigger } from '@modules/graphql-subscriptions/pub-sub.service';
import { ContractPubSubEvent, PaymentTransactionPubSubEvent } from '@modules/graphql-subscriptions/types';
import { PaymentTransferFailureEvent } from '@modules/notifications/services/payment-transfer-failure/payment-transfer-failure.event';
import { PaymentTransferSuccessEvent } from '@modules/notifications/services/payment-transfer-success/payment-transfer-success.event';
import { Process, Processor } from '@nestjs/bull';
import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InnopayCashOutService } from '@third-parties/innopay-payment/src/services/innopay-cash-out.service';
import { Job } from 'bull';
import { PAYMENT_LIVIN_SENDER_NAME } from 'src/rental-context/constants';

import { PaymentBulls, PaymentTransactionProcess, TransactionJobPayload } from '../types';

@Processor(PaymentBulls.PAYMENT_TRANSACTION)
export class PaymentTransactionCashOutProcessor {
  private isProduction: boolean;

  constructor(
    private readonly innopayCashOutService: InnopayCashOutService,
    private readonly paymentTransactionRepository: PaymentTransactionRepository,
    private readonly contractRepository: ContractRepository,
    private readonly completeCashOutInnopayTransactionProducer: CompleteCashOutInnopayTransactionProducer,
    private readonly unitOfWork: UnitOfWork,
    private readonly configService: ConfigService,
    private readonly eventEmitter: EventEmitter2,
    private readonly pubSubService: PubSubService,
  ) {
    this.isProduction = this.configService.get<string>('nodeEnv') === 'production';
  }

  @Process(PaymentTransactionProcess.CASH_OUT)
  async handle(job: Job<TransactionJobPayload>) {
    const { paymentTransactionId } = job.data;

    const trxId = await this.unitOfWork.start();

    let landlordCustomerReference: string | undefined;
    let livinCustomerReference: string | undefined;

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
      if (!paymentTransaction.isCashOutActive()) {
        throw new PaymentTransactionNotActiveProblem();
      }

      const card = paymentTransaction.recipientCardOrFail;

      const { success, customerReference: landlordCustomerReference } = await this.startCashOut(
        paymentTransaction,
        card,
      );

      try {
        if (!success) {
          await this.endCashOut([landlordCustomerReference], false);
          throw new InnopayServiceBadRequestProblem();
        }

        const cashOutResult = await this.endCashOut([landlordCustomerReference], true);

        if (!cashOutResult) {
          throw new InnopayServiceBadRequestProblem();
        }

        paymentTransaction.cashOutSuccess(card.cardMeta, {
          customerReference: landlordCustomerReference,
          livinCustomerReference,
        });
      } catch (error) {
        paymentTransaction.failure(PaymentInvoiceType.RECEIVING, card.cardMeta, {
          customerReference: landlordCustomerReference,
          livinCustomerReference,
        });
      }

      contract.endPending();

      await Promise.all([
        this.paymentTransactionRepository.save(paymentTransaction, trxId),
        this.contractRepository.save(contract, trxId),
      ]);

      await this.unitOfWork.execute(trxId);

      this.publishPaymentTransaction(paymentTransaction);
      this.publishContract(contract);

      this.eventEmitter.emit(
        PaymentTransferSuccessEvent.eventName,
        PaymentTransferSuccessEvent.create({ recipientId: paymentTransaction.recipientId }),
      );
    } catch (error) {
      await this.unitOfWork.rollback(trxId);

      const [paymentTransaction, contract] = await Promise.all([
        this.paymentTransactionRepository.findOneById(paymentTransactionId),
        this.contractRepository.findOneByPaymentTransactionId(paymentTransactionId),
      ]);

      if (paymentTransaction && contract && landlordCustomerReference) {
        const card = paymentTransaction.recipientCardOrFail;
        paymentTransaction.failure(
          PaymentInvoiceType.RECEIVING,
          card.cardMeta,
          { customerReference: landlordCustomerReference, livinCustomerReference },
          JSON.stringify(error),
        );
        contract.endPending();

        await Promise.all([
          this.paymentTransactionRepository.save(paymentTransaction),
          this.contractRepository.save(contract),
        ]);

        this.publishContract(contract);

        this.eventEmitter.emit(
          PaymentTransferFailureEvent.eventName,
          PaymentTransferFailureEvent.create({ recipientId: paymentTransaction.recipientId }),
        );
      }

      throw error;
    }
  }

  private async startCashOut(paymentTransaction: PaymentTransactionEntity, card: InnopayCardEntity) {
    const result = await Promise.all([
      this.innopayCashOutService.startCashOut({
        RECEIVER_CARD_ID: card.cnpCardId,
        RECEIVER_USER_ID: card.cnpUserId,
        USER_LOGIN: this.configService.get<string>('payment.livin.subaccount.userLogin') as string,
        CARD_ID: this.configService.get<number>('payment.livin.subaccount.cardId') as number,
        USER_ID: this.configService.get<number>('payment.livin.subaccount.userId') as number,
        senderName: PAYMENT_LIVIN_SENDER_NAME,
        tranAmount: this.isProduction ? paymentTransaction.totalAmountToBeTransferred : 333333,
      }),
      // this.innopayCashOutService.startCashOut({
      //   RECEIVER_CARD_ID: this.configService.get<number>('payment.livin.withdrawal.cardId') as number,
      //   RECEIVER_USER_ID: this.configService.get<number>('payment.livin.withdrawal.userId') as number,
      //   USER_LOGIN: this.configService.get<string>('payment.livin.subaccount.userLogin') as string,
      //   CARD_ID: this.configService.get<number>('payment.livin.subaccount.cardId') as number,
      //   USER_ID: this.configService.get<number>('payment.livin.subaccount.userId') as number,
      //   senderName: PAYMENT_LIVIN_SENDER_NAME,
      //   tranAmount: this.isProduction ? paymentTransaction.totalRevenue : 666666,
      // }),
    ]);

    return {
      success: result.every((cashOutResult) => cashOutResult?.success),
      customerReference: result[0].сashOutResult.customerReference,
      // livinCustomerReference: result[1].сashOutResult.customerReference,
    };
  }

  private async endCashOut(customerReferences: string[], success: boolean) {
    const result = await Promise.all(
      customerReferences.map((customerReferences) =>
        this.innopayCashOutService.endCashOut(customerReferences, success),
      ),
    );

    const failedTransactions = result.flatMap((result) => {
      if (result.success) {
        return [];
      }

      return result.customerReference;
    });

    const isSuccess = !failedTransactions.length;

    if (!isSuccess) {
      failedTransactions.forEach((customerReference) =>
        this.completeCashOutInnopayTransactionProducer.send({ customerReference, success, iteration: 0 }),
      );
    }

    return isSuccess;
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
