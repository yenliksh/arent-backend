import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { PaymentTransactionStatus } from '@domains/payment-transaction/domain/types';
import { IllegalOperationException } from '@libs/exceptions/illegal-operation.exception';
import { DateUtil } from '@libs/utils/date-util';
import { INNOPAY_CASH_IN_TAX_RATE } from 'src/rental-context/constants';

import { RentPeriodStrategyType } from '../../rental-manager/types';
import { costCeil, costFloor } from '../../rental-strategies/utils/cost-rounds.util';
import { PaymentLandlordCancelationResponse } from '../types';
import { BaseLongTermRentCancelationStrategy } from './base-long-term-rent-cancelation.strategy';

export class LongTermRentLandlordCancelationStrategy extends BaseLongTermRentCancelationStrategy {
  constructor(readonly contract: ContractEntity, transactions: PaymentTransactionEntity[]) {
    super(
      contract,
      [...transactions].sort((a, b) => a.startDate.getDate().getTime() - b.startDate.getDate().getTime()),
    );
  }

  private _validExcuse = false;
  private _forcedCancelation = false;

  public validExcuse() {
    this._validExcuse = true;
  }

  public forcedCancelation() {
    this._forcedCancelation = true;
  }

  handle(): PaymentLandlordCancelationResponse<RentPeriodStrategyType.LONG_TERM_RENT> {
    const now = DateUtil.utcNow().millisecond(0);

    // 0 stage for ADMIN RESOLVE MANUALLY
    if (this._cancelationByAdmin) {
      if (this._forcedCancelation) {
        return {
          strategyType: RentPeriodStrategyType.LONG_TERM_RENT,
          cancelationDate: now.toISOString(),
          checkOutDate: now.toISOString(),
          refundsAmountToSender: 0,
          withdrawalAmountFromRecipient: 0,
          transferAmountToRecipient: 0,
          transferAmountToPlatform: 0,
          isFine: false,
        };
      }

      const { refundsAmountToSender, withdrawalAmountFromRecipient, totalAmountToBeTransferred, totalRevenue } =
        this.computeRefundsCancelationByAdmin();

      // 0.1 stage. By valid excuse.
      if (this._validExcuse) {
        return {
          strategyType: RentPeriodStrategyType.LONG_TERM_RENT,
          cancelationDate: now.toISOString(),
          checkOutDate: now.toISOString(),
          refundsAmountToSender,
          withdrawalAmountFromRecipient,
          transferAmountToRecipient: totalAmountToBeTransferred,
          transferAmountToPlatform: totalRevenue,
          isFine: false,
        };
      }

      // 0.2 stage. By not valid excuse.
      throw new IllegalOperationException('Admin cannot be able cancel rent by not valid excuse');
    }

    return {
      strategyType: RentPeriodStrategyType.LONG_TERM_RENT,
      cancelationDate: now.toISOString(),
      checkOutDate: now.toISOString(),
      refundsAmountToSender: 0,
      withdrawalAmountFromRecipient: 0,
      transferAmountToRecipient: 0,
      transferAmountToPlatform: 0,
      isFine: false,
    };
  }

  private lastPayedTransaction(): PaymentTransactionEntity | undefined {
    const sortedTransactions = [...this.transactions]
      .filter((i) => [PaymentTransactionStatus.COMPLETED, PaymentTransactionStatus.CASH_OUT_WAITING].includes(i.status))
      .sort((a, b) => (DateUtil.parseUTC(a.startDate.value).isAfter(b.startDate.value) ? 1 : -1));

    const lastPaidTransaction =
      sortedTransactions?.[0] &&
      [PaymentTransactionStatus.COMPLETED, PaymentTransactionStatus.CASH_OUT_WAITING].includes(
        sortedTransactions?.[0].status,
      )
        ? sortedTransactions[0]
        : null;

    if (!lastPaidTransaction) {
      throw new IllegalOperationException('Cannot be found last paid transactions');
    }

    return lastPaidTransaction;
  }

  private computeRefundsCancelationByAdmin(now = DateUtil.utcNow().millisecond(0)) {
    const currentPayedTransaction = this.lastPayedTransaction();

    if (!currentPayedTransaction) {
      throw new IllegalOperationException('Cancelation can not be performed for unpaid contract');
    }

    const stayHours = DateUtil.getDiffHours(this.arrivalDate, now.toISOString());

    const isNotStayTime = stayHours < 0;

    const isMoneyOnSubAccount = currentPayedTransaction.status === PaymentTransactionStatus.CASH_OUT_WAITING;

    const fullRefundAmount =
      currentPayedTransaction.cost.cost + currentPayedTransaction.cost.cost * this._senderTaxRate;

    let totalAmountToBeTransferred = 0;
    let totalRevenue = 0;

    const cashInTax = fullRefundAmount * INNOPAY_CASH_IN_TAX_RATE;

    const refundAmount = isNotStayTime ? fullRefundAmount - cashInTax : 0;

    if (isMoneyOnSubAccount && !isNotStayTime) {
      totalAmountToBeTransferred += currentPayedTransaction.totalAmountToBeTransferred;
      totalRevenue += currentPayedTransaction.totalRevenue;
    }

    return {
      refundsAmountToSender: costCeil(refundAmount),
      withdrawalAmountFromRecipient: 0,
      totalAmountToBeTransferred: costCeil(totalAmountToBeTransferred),
      totalRevenue: costFloor(totalRevenue),
    };
  }
}
