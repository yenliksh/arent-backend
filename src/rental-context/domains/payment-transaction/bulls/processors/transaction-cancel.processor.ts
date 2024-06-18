import { ContractOrmMapper } from '@domain-repositories/contract/contract.orm-mapper';
import { ContractRepository } from '@domain-repositories/contract/contract.repository';
import { PaymentTransactionOrmMapper } from '@domain-repositories/payment-transaction/payment-transaction.orm-mapper';
import { PaymentTransactionRepository } from '@domain-repositories/payment-transaction/payment-transaction.repository';
import { UserRepository } from '@domain-repositories/user/user.repository';
import { UpdateContractPaymentTransactionCommand } from '@domains/contract/commands/update-contract-payment-transaction/update-contract-payment-transaction.command';
import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { CancellationData } from '@domains/contract/domain/types';
import { InnopayCardEntity } from '@domains/innopay-card/domain/entities/innopay-card.entity';
import { CompleteCashOutInnopayTransactionProducer } from '@domains/innopay-transaction/bulls/sqs-producers/complete-cash-out-innopay-transaction.producer';
import { ReverseInnopayTransactionCommand } from '@domains/innopay-transaction/commands/reverse-innopay-transaction/reverse-innopay-transaction.command';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { PaymentTransactionStatus } from '@domains/payment-transaction/domain/types';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ContractStatus } from '@infrastructure/enums';
import { InnopayServiceBadRequestProblem } from '@infrastructure/problems/innopay-service-bad-request.problem';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { PubSubService, PubSubTrigger } from '@modules/graphql-subscriptions/pub-sub.service';
import { ContractPubSubEvent, PaymentTransactionPubSubEvent } from '@modules/graphql-subscriptions/types';
import { Process, Processor } from '@nestjs/bull';
import { BadGatewayException, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import * as Sentry from '@sentry/node';
import { InnopayCashInService } from '@third-parties/innopay-payment/src/services/innopay-cash-in.service';
import { InnopayCashOutService } from '@third-parties/innopay-payment/src/services/innopay-cash-out.service';
import { Job } from 'bull';
import { PAYMENT_LIVIN_SENDER_NAME } from 'src/rental-context/constants';

import { CancelTransactionJobPayload, PaymentBulls, PaymentTransactionProcess } from '../types';

interface CashOutInfo {
  refundsToSenderSuccess?: boolean;
  transferToPlatformSuccess?: boolean;
  transferToRecipientSuccess?: boolean;
  withdrawalFromSenderSuccess?: boolean;
  needRefundsToSender?: boolean;
  needTransferToPlatform?: boolean;
  needTransferToRecipient?: boolean;
  needWithdrawalFromSender?: boolean;
}

@Processor(PaymentBulls.PAYMENT_TRANSACTION)
export class PaymentTransactionCancelProcessor {
  private isProduction: boolean;

  constructor(
    private readonly innopayCashOutService: InnopayCashOutService,
    private readonly innopayCashInService: InnopayCashInService,
    private readonly paymentTransactionRepository: PaymentTransactionRepository,
    private readonly contractRepository: ContractRepository,
    private readonly userRepository: UserRepository,
    private readonly completeCashOutInnopayTransactionProducer: CompleteCashOutInnopayTransactionProducer,
    private readonly configService: ConfigService,
    private readonly unitOfWork: UnitOfWork,
    private commandBus: CommandBus,
    private readonly pubSubService: PubSubService,
  ) {
    this.isProduction = this.configService.get<string>('nodeEnv') === 'production';
  }

  @Process(PaymentTransactionProcess.CANCEL)
  async handle(job: Job<CancelTransactionJobPayload>) {
    const { contractId, checkOutDate: inputCheckoutDate, adminCancelMeta, trigger } = job.data;
    const checkOutDate = inputCheckoutDate ? new DateTimeISOTZVO(inputCheckoutDate) : undefined;

    const trxId = await this.unitOfWork.start();

    // For error log in PaymentInvoice
    // If one of these payments fails, admins can see it in payment_invoices in database
    const cashOutInfo: CashOutInfo = {};

    try {
      const contract = await this.contractRepository.findOneById(contractId, trxId);

      if (!contract) {
        throw new NotFoundException('Contract not found');
      }

      const paymentTransactions = await this.paymentTransactionRepository.findMany(
        { contractId: new UUID(contractId) },
        trxId,
      );

      if (!paymentTransactions.length) {
        throw new UnprocessableEntityException('Contract cannot exist without transactions');
      }

      // if paymentTransactions.length !== 0, cancelationData always will be not undefined
      const cancelationData = contract.cancel(
        { paymentTransactions, trigger, newCheckOutDate: checkOutDate },
        adminCancelMeta,
      );

      if (cancelationData.isFine) {
        const landlord = await this.userRepository.findOneById(contract.landlordIdOrFail.value, trxId);

        if (!landlord) {
          throw new NotFoundException('Landlord not found');
        }

        landlord.fining();
        await this.userRepository.save(landlord, trxId);
      }

      // Case 1. Enough to update next one transaction and remove other transactions. No need to send money.
      if (cancelationData.recomputedLastStayTransaction) {
        await this.finishCancelation(
          {
            contract,
            allPaymentTransactions: paymentTransactions,
            updatingPaymentTransaction: cancelationData.recomputedLastStayTransaction,
          },
          cancelationData.checkOutDate,
          trxId,
        );

        await this.unitOfWork.commit(trxId);

        return;
      }

      // Сase 2. No need to update next one transaction and no need to send money
      const totalCancelationAmount =
        cancelationData.refundsAmountToSender +
        cancelationData.transferAmountToPlatform +
        cancelationData.transferAmountToRecipient +
        (cancelationData.withdrawalAmountFromSender ?? 0);

      if (!totalCancelationAmount) {
        await this.finishCancelation(
          { contract, allPaymentTransactions: paymentTransactions },
          cancelationData.checkOutDate,
          trxId,
        );

        await this.unitOfWork.commit(trxId);

        return;
      }

      // Case 3. Need to send money to some of tenant, livin, landlord (one person, many persons, all these persons)
      const senderCard = paymentTransactions[0].senderCardOrFail;
      const recipientCard = paymentTransactions[0].recipientCardOrFail;

      cashOutInfo.needRefundsToSender = !!cancelationData.refundsAmountToSender;
      cashOutInfo.needTransferToPlatform = !!cancelationData.transferAmountToPlatform;
      cashOutInfo.needTransferToRecipient = !!cancelationData.transferAmountToRecipient;
      cashOutInfo.needWithdrawalFromSender = !!cancelationData.withdrawalAmountFromSender;

      if (cashOutInfo.needWithdrawalFromSender && cancelationData.withdrawalAmountFromSender) {
        const { payResult, customerReference } = await this.innopayCashInService.paySavedCard({
          amount: this.isProduction ? cancelationData.withdrawalAmountFromSender : 999999,
          cardId: senderCard.cnpCardId,
          userLogin: senderCard.userId.value,
          userId: senderCard.cnpUserId,
          paymentTarget: contractId,
        });

        if (!payResult) {
          await this.commandBus.execute<ReverseInnopayTransactionCommand>(
            new ReverseInnopayTransactionCommand(customerReference),
          );

          throw new BadGatewayException('Something went wrong');
        }

        cashOutInfo.withdrawalFromSenderSuccess = payResult;

        if (!cashOutInfo.withdrawalFromSenderSuccess) {
          throw new InnopayServiceBadRequestProblem('Cannot withdrawal from sender');
        }
      }

      const startCashOutResult = await this.startCashOut(cashOutInfo, cancelationData, {
        recipient: recipientCard,
        sender: senderCard,
      });

      const activeCustomerReferences = startCashOutResult.customerReferences.flatMap((customerReference) => {
        if (!customerReference) {
          return [];
        }

        return customerReference;
      });

      if (!startCashOutResult.success) {
        await this.endCashOut(activeCustomerReferences, false);
        throw new InnopayServiceBadRequestProblem();
      }

      const cashOutResult = await this.endCashOut(activeCustomerReferences, true);

      if (!cashOutResult) {
        throw new InnopayServiceBadRequestProblem();
      }

      await this.finishCancelation(
        { contract, allPaymentTransactions: paymentTransactions },
        cancelationData.checkOutDate,
        trxId,
      );

      await this.unitOfWork.commit(trxId);
    } catch (error) {
      await this.unitOfWork.rollback(trxId);

      const contract = await this.contractRepository.findOneById(contractId);

      if (contract) {
        contract.endPending();

        await this.contractRepository.save(contract);

        this.publishContract(contract);
      }

      // TODO: добавлять cashOutSuccess и понятное описание ошибки в бд
      Logger.error(error);
      Sentry.captureException(error);

      if (Object.keys(cashOutInfo).length) {
        Logger.warn(cashOutInfo);
        Sentry.captureException(cashOutInfo);
      }

      throw error;
    }
  }

  private async startCashOut(
    cashOutInfo: CashOutInfo,
    cancelationData: CancellationData,
    cards: { recipient: InnopayCardEntity; sender: InnopayCardEntity },
  ) {
    const { recipient: recipientCard, sender: senderCard } = cards;

    const cancelationCashOutPaymentsPromises = [
      cashOutInfo.needRefundsToSender
        ? this.innopayCashOutService.startCashOut({
            RECEIVER_CARD_ID: senderCard.cnpCardId,
            RECEIVER_USER_ID: senderCard.cnpUserId,
            USER_LOGIN: this.configService.get<string>('payment.livin.subaccount.userLogin') as string,
            CARD_ID: this.configService.get<number>('payment.livin.subaccount.cardId') as number,
            USER_ID: this.configService.get<number>('payment.livin.subaccount.userId') as number,
            senderName: PAYMENT_LIVIN_SENDER_NAME,
            tranAmount: this.isProduction ? cancelationData.refundsAmountToSender : 222222,
          })
        : undefined,
      cashOutInfo.needTransferToPlatform
        ? this.innopayCashOutService.startCashOut({
            RECEIVER_CARD_ID: this.configService.get<number>('payment.livin.withdrawal.cardId') as number,
            RECEIVER_USER_ID: this.configService.get<number>('payment.livin.withdrawal.userId') as number,
            USER_LOGIN: this.configService.get<string>('payment.livin.subaccount.userLogin') as string,
            CARD_ID: this.configService.get<number>('payment.livin.subaccount.cardId') as number,
            USER_ID: this.configService.get<number>('payment.livin.subaccount.userId') as number,
            senderName: PAYMENT_LIVIN_SENDER_NAME,
            tranAmount: this.isProduction ? cancelationData.transferAmountToPlatform : 222222,
          })
        : undefined,
      cashOutInfo.needTransferToRecipient
        ? this.innopayCashOutService.startCashOut({
            RECEIVER_CARD_ID: recipientCard.cnpCardId,
            RECEIVER_USER_ID: recipientCard.cnpUserId,
            USER_LOGIN: this.configService.get<string>('payment.livin.subaccount.userLogin') as string,
            CARD_ID: this.configService.get<number>('payment.livin.subaccount.cardId') as number,
            USER_ID: this.configService.get<number>('payment.livin.subaccount.userId') as number,
            senderName: PAYMENT_LIVIN_SENDER_NAME,
            tranAmount: this.isProduction ? cancelationData.transferAmountToRecipient : 444444,
          })
        : undefined,
    ];

    const cashOutResults = await Promise.all(cancelationCashOutPaymentsPromises);

    // check success pay
    if (cashOutResults.some((cashOutResult) => cashOutResult && !cashOutResult.success)) {
      return {
        success: false,
        customerReferences: cashOutResults.map((cashOutResult) => cashOutResult?.сashOutResult.customerReference),
      };
    }

    // check is all transaction matched
    const [
      refundsToSenderCustomerReference,
      transferToPlatformCustomerReference,
      transferToRecipientCustomerReference,
    ] = cashOutResults.map((cashOutResult) => cashOutResult?.сashOutResult.customerReference);

    if (
      !this.isCashOutInfoMatched(cashOutInfo, {
        refundsToSenderSuccess: !!refundsToSenderCustomerReference,
        transferToPlatformSuccess: !!transferToPlatformCustomerReference,
        transferToRecipientSuccess: !!transferToRecipientCustomerReference,
        withdrawalFromSenderSuccess: cashOutInfo.needWithdrawalFromSender,
      })
    ) {
      return {
        success: false,
        customerReferences: [
          refundsToSenderCustomerReference,
          transferToPlatformCustomerReference,
          transferToRecipientCustomerReference,
        ],
      };
    }

    return {
      success: true,
      customerReferences: [
        refundsToSenderCustomerReference,
        transferToPlatformCustomerReference,
        transferToRecipientCustomerReference,
      ],
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

  private async finishCancelation(
    {
      contract,
      allPaymentTransactions,
      updatingPaymentTransaction,
    }: {
      contract: ContractEntity;
      allPaymentTransactions?: PaymentTransactionEntity[];
      updatingPaymentTransaction?: PaymentTransactionEntity;
    },
    checkOutDate: string,
    trxId: TransactionId,
  ) {
    contract.endPending();

    const paymentTransactions = allPaymentTransactions
      ?.filter((paymentTransaction) => !paymentTransaction.id.equals(updatingPaymentTransaction?.id))
      .reduce(
        (acc, curr) => {
          // need to deleting
          if (
            curr.status === PaymentTransactionStatus.CASH_IN_WAITING &&
            Date.parse(curr.startDate.value) > Date.parse(checkOutDate)
          ) {
            return { deliting: [...acc.deliting, curr], saving: acc.saving };
          }

          // need to canceling
          if (curr.status === PaymentTransactionStatus.CASH_OUT_WAITING) {
            const isConcludedContractWithFutureRecomputedTransaction =
              updatingPaymentTransaction && contract.status.value === ContractStatus.CONCLUDED;

            if (!isConcludedContractWithFutureRecomputedTransaction) {
              curr.cancel();
            }

            return { deliting: acc.deliting, saving: [...acc.saving, curr] };
          }

          // dont need to update
          return acc;
        },
        { deliting: [], saving: [] } as { deliting: PaymentTransactionEntity[]; saving: PaymentTransactionEntity[] },
      );

    await Promise.all([
      this.contractRepository.save(contract, trxId),
      updatingPaymentTransaction
        ? this.paymentTransactionRepository.save(updatingPaymentTransaction, trxId)
        : undefined,
      paymentTransactions?.deliting.map((transaction) => this.paymentTransactionRepository.delete(transaction, trxId)),
      paymentTransactions?.saving.map((transaction) => this.paymentTransactionRepository.save(transaction, trxId)),
    ]);

    await this.commandBus.execute<UpdateContractPaymentTransactionCommand>(
      new UpdateContractPaymentTransactionCommand(contract.id, trxId),
    );

    // publish all
    this.publishContract(contract);
    if (updatingPaymentTransaction) {
      this.publishPaymentTransaction(updatingPaymentTransaction, PaymentTransactionPubSubEvent.UPDATED);
    }
    paymentTransactions?.saving.map((transaction) =>
      this.publishPaymentTransaction(transaction, PaymentTransactionPubSubEvent.UPDATED),
    );
    paymentTransactions?.deliting.map((transaction) =>
      this.publishPaymentTransaction(transaction, PaymentTransactionPubSubEvent.DELETED),
    );
  }

  private isCashOutInfoMatched(
    cashOutNeeds: CashOutInfo,
    cashOutResults?: Pick<
      CashOutInfo,
      | 'refundsToSenderSuccess'
      | 'transferToPlatformSuccess'
      | 'transferToRecipientSuccess'
      | 'withdrawalFromSenderSuccess'
    >,
  ) {
    const results = cashOutResults ?? cashOutNeeds;

    const needRefundsToSender = cashOutNeeds.needRefundsToSender ? results.refundsToSenderSuccess : true;
    const needTransferToPlatform = cashOutNeeds.needTransferToPlatform ? results.transferToPlatformSuccess : true;
    const needTransferToRecipient = cashOutNeeds.needTransferToRecipient ? results.transferToRecipientSuccess : true;
    const needWithdrawalFromSender = cashOutNeeds.needWithdrawalFromSender ? results.withdrawalFromSenderSuccess : true;

    return needRefundsToSender && needTransferToPlatform && needTransferToRecipient && needWithdrawalFromSender;
  }

  async publishPaymentTransaction(paymentTransaction: PaymentTransactionEntity, event: PaymentTransactionPubSubEvent) {
    const mapper = new PaymentTransactionOrmMapper(PaymentTransactionEntity);
    const ormPaymentTransaction = await mapper.toOrmEntity(paymentTransaction);

    this.pubSubService.publish(PubSubTrigger.UPDATE_PAYMENT_TRANSACTION, {
      paymentTransaction: ormPaymentTransaction,
      cardOwnerId: paymentTransaction.senderId.value,
      event,
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
