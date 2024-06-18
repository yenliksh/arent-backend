import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { PaymentTransactionStatus } from '@domains/payment-transaction/domain/types';
import { IllegalOperationException } from '@libs/exceptions/illegal-operation.exception';
import { DateUtil } from '@libs/utils/date-util';

import { RentPeriodStrategyType } from '../../rental-manager/types';
import { costCeil, costFloor } from '../../rental-strategies/utils/cost-rounds.util';
import { PaymentLandlordCancelationResponse } from '../types';
import { BaseShortTermRentCancelationStrategy } from './base-short-term-rent-cancelation.strategy';

export class ShortTermRentLandlordCancelationStrategy extends BaseShortTermRentCancelationStrategy {
  constructor(readonly contract: ContractEntity, transactions: PaymentTransactionEntity[]) {
    super(
      contract,
      [...transactions].sort((a, b) => a.startDate.getDate().getTime() - b.startDate.getDate().getTime()),
    );
  }

  handle(): PaymentLandlordCancelationResponse<RentPeriodStrategyType.SHORT_TERM_RENT> {
    const now = DateUtil.utcNow().millisecond(0);

    // 0 stage for ADMIN RESOLVE MANUALLY
    if (this._cancelationByAdmin) {
      const { refundsAmountToSender, withdrawalAmountFromRecipient, totalAmountToBeTransferred, totalRevenue } =
        this.computeRefundsByAdmin(now);

      // 0.1 stage. By valid excuse.

      return {
        strategyType: RentPeriodStrategyType.SHORT_TERM_RENT,
        cancelationDate: now.toISOString(),
        checkOutDate: now.toISOString(),
        refundsAmountToSender,
        withdrawalAmountFromRecipient,
        transferAmountToRecipient: totalAmountToBeTransferred,
        transferAmountToPlatform: totalRevenue,
        isFine: this._validExcuse ? false : true,
      };
    }

    return {
      strategyType: RentPeriodStrategyType.SHORT_TERM_RENT,
      cancelationDate: now.toISOString(),
      checkOutDate: now.toISOString(),
      refundsAmountToSender: 0,
      withdrawalAmountFromRecipient: 0,
      transferAmountToRecipient: 0,
      transferAmountToPlatform: 0,
      isFine: false,
    };
  }

  private computeRefundsByAdmin(now = DateUtil.utcNow().millisecond(0)) {
    const currentPayedTransaction = this.currentPayedTransaction(now);

    if (!currentPayedTransaction) {
      throw new IllegalOperationException('Cancelation can not be performed for unpaid contract');
    }

    if (this.periodTypeMap.BEFORE_ARRIVAL(now)) {
      if (currentPayedTransaction.status !== PaymentTransactionStatus.CASH_OUT_WAITING) {
        throw new IllegalOperationException(
          'Cancelation can not be performed for unpaid contract or money was already transferred',
        );
      }

      const { refundsAmountToSender, totalAmountToBeTransferred, totalRevenue } = this.computeTaxByAdminCancelation(
        now,
        currentPayedTransaction,
      );

      const withdrawalAmountFromRecipientWithTax = 0;

      return {
        refundsAmountToSender: costCeil(refundsAmountToSender),
        withdrawalAmountFromRecipient: costCeil(withdrawalAmountFromRecipientWithTax),
        totalAmountToBeTransferred: costCeil(totalAmountToBeTransferred),
        totalRevenue: costFloor(totalRevenue < 0 ? 0 : totalRevenue),
      };
    }

    if (this.periodTypeMap.WITHIN_24_HOURS_OF_STAY(now)) {
      if (currentPayedTransaction.status !== PaymentTransactionStatus.CASH_OUT_WAITING) {
        throw new IllegalOperationException(
          'Cancelation can not be performed for unpaid contract or money was already transferred',
        );
      }

      const { refundsAmountToSender, totalAmountToBeTransferred, totalRevenue } = this.computeTaxByLivedHours(
        now,
        currentPayedTransaction,
      );

      const withdrawalAmountFromRecipientWithTax = 0;

      return {
        refundsAmountToSender: costCeil(refundsAmountToSender),
        withdrawalAmountFromRecipient: costCeil(withdrawalAmountFromRecipientWithTax),
        totalAmountToBeTransferred: costCeil(totalAmountToBeTransferred),
        totalRevenue: costFloor(totalRevenue),
      };
    }

    if (this.periodTypeMap.WHILE_LIVING(now)) {
      const recomputedTransfers = this.computeTaxByLivedHours(now, currentPayedTransaction);

      let totalAmountToBeTransferred = 0;

      let { totalRevenue } = recomputedTransfers;

      const { refundsAmountToSender, withdrawalAmountFromRecipient } = recomputedTransfers;

      if (currentPayedTransaction.status === PaymentTransactionStatus.CASH_OUT_WAITING) {
        totalAmountToBeTransferred += currentPayedTransaction.totalAmountToBeTransferred;
        totalRevenue += currentPayedTransaction.totalRevenue;
      }

      return {
        refundsAmountToSender: costCeil(refundsAmountToSender),
        withdrawalAmountFromRecipient: costCeil(withdrawalAmountFromRecipient),
        totalAmountToBeTransferred: costCeil(totalAmountToBeTransferred),
        totalRevenue: costFloor(totalRevenue),
      };
    }

    throw new IllegalOperationException('Something went wrong');
  }
}
