import { RentPeriodStrategyType } from '@domains/contract/base-classes/rental-manager/types';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { PaymentTransactionStatus } from '@domains/payment-transaction/domain/types';
import { PaymentHistorySearchType } from '@domains/payment-transaction/types';
import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { Injectable } from '@nestjs/common';
import { QueryBuilder } from 'objection';
import { Ok } from 'oxide.ts';

@Injectable()
export class NextPaymentTransactionService {
  async handle(userId: UUID, paymentSearchType: PaymentHistorySearchType): Promise<Ok<PaymentTransactionOrmEntity[]>> {
    const usePaymentSearchFilter: {
      [P in PaymentHistorySearchType]: (
        qb: QueryBuilder<PaymentTransactionOrmEntity, PaymentTransactionOrmEntity[]>,
      ) => void;
    } = {
      [PaymentHistorySearchType.SINGLE]: (paymentTransactionsQb) =>
        paymentTransactionsQb.where({ rentPeriodStrategyType: RentPeriodStrategyType.SHORT_TERM_RENT }),
      [PaymentHistorySearchType.RECURRING]: (paymentTransactionsQb) =>
        paymentTransactionsQb.whereIn('rentPeriodStrategyType', [
          RentPeriodStrategyType.MIDDLE_TERM_RENT,
          RentPeriodStrategyType.LONG_TERM_RENT,
        ]),
    };

    const paymentTransactionsQb = PaymentTransactionOrmEntity.query()
      .innerJoinRelated({ contract: true })
      .where('contract.tenantId', userId.value)
      .where(`${PaymentTransactionOrmEntity.tableName}.status`, PaymentTransactionStatus.CASH_IN_WAITING)
      .where((builder) =>
        builder
          .whereRaw(
            `${PaymentTransactionOrmEntity.tableName}."withdrawFundsDate" <= NOW() + INTERVAL '${PaymentTransactionEntity.EARLY_PAY_DAYS} day'`,
          )
          .orWhere((builder) => {
            builder.whereRaw('payment_transactions.id = contract."nextPaymentTransactionId"');
          }),
      )
      .orderBy('payment_transactions.withdrawFundsDate', 'ASC');

    usePaymentSearchFilter[paymentSearchType](paymentTransactionsQb);

    const paymentTransactions = await paymentTransactionsQb;

    return Ok(paymentTransactions);
  }
}
