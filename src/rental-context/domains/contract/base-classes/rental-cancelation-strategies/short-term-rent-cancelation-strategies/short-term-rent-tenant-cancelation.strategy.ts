import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { PaymentTransactionStatus } from '@domains/payment-transaction/domain/types';
import { ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
import { IllegalOperationException } from '@libs/exceptions/illegal-operation.exception';
import { DateUtil } from '@libs/utils/date-util';
import { INNOPAY_CASH_IN_TAX_RATE, INNOPAY_CASH_OUT_TAX_RATE } from 'src/rental-context/constants';

import { RentPeriodStrategyType } from '../../rental-manager/types';
import { costCeil, costFloor } from '../../rental-strategies/utils/cost-rounds.util';
import { ICancelationRulesMeta, PaymentTenantCancelationResponse } from '../types';
import { BaseShortTermRentCancelationStrategy } from './base-short-term-rent-cancelation.strategy';

export class ShortTermRentTenantCancelationStrategy extends BaseShortTermRentCancelationStrategy {
  constructor(readonly contract: ContractEntity, transactions: PaymentTransactionEntity[]) {
    super(
      contract,
      [...transactions].sort((a, b) => a.startDate.getDate().getTime() - b.startDate.getDate().getTime()),
    );
  }

  private _cancelationRulesMap: { [P in ShortTermRentCancellationPolicyType]: ICancelationRulesMeta } = {
    [ShortTermRentCancellationPolicyType.FLEXIBLE]: {
      timeBeforeArrivalInHours: 24,

      cancellationFeeRateSoft: 1,
      cancellationFeeRateHard: 0,

      seriousReasonTimeInHours: 24,
    },
    [ShortTermRentCancellationPolicyType.MODERATE]: {
      timeBeforeArrivalInHours: 120, // 5 days

      cancellationFeeRateSoft: 1,
      cancellationFeeRateHard: 0.5,

      seriousReasonTimeInHours: 24,
    },
    [ShortTermRentCancellationPolicyType.INFLEXIBLE]: {
      timeBeforeArrivalInHours: 720, // 30 days
      minTimeBeforeArrivalInHours: 168, // 7 days

      relativeBooking: {
        cancellationTime: 48, // 2 days
        arrivingDaysLeftInHours: 336, // 14 days
      },

      cancellationFeeRateSoft: 1,
      cancellationFeeRateHard: 0.5,

      seriousReasonTimeInHours: 24,
    },
    [ShortTermRentCancellationPolicyType.STRICT]: {
      minTimeBeforeArrivalInHours: 168, // 7 days

      relativeBooking: {
        cancellationTime: 48, // 2 days
        arrivingDaysLeftInHours: 336, // 14 days
      },

      cancellationFeeRateSoft: 1,
      cancellationFeeRateHard: 0.5,

      seriousReasonTimeInHours: 24,
    },
  };

  handle(): PaymentTenantCancelationResponse<RentPeriodStrategyType.SHORT_TERM_RENT> {
    const cancelationRulesMeta = this._cancelationRulesMap[this._cancelationType];

    const now = DateUtil.utcNow().millisecond(0);
    const nowIsStayTime = DateUtil.getDiffHours(now.toISOString(), this.arrivalDate) <= 0;

    // 0 stage for ADMIN RESOLVE MANUALLY
    if (this._cancelationByAdmin) {
      const stayHours = DateUtil.getDiffHours(this.arrivalDate, now.toISOString());

      const [refundsAmount, totalAmountToBeTransferred, totalRevenue] = this.computeRefunds(1);

      if (stayHours <= cancelationRulesMeta.seriousReasonTimeInHours) {
        return {
          strategyType: RentPeriodStrategyType.SHORT_TERM_RENT,
          cancelationPolicyType: this._cancelationType,
          cancelationDate: now.toISOString(),
          checkOutDate: now.toISOString(),
          refundsAmountToSender: refundsAmount,
          transferAmountToRecipient: totalAmountToBeTransferred,
          transferAmountToPlatform: totalRevenue,
        };
      }

      throw new IllegalOperationException(
        'Cancellation by the administrator cannot be performed due to: more than 24 hours have passed since the stay',
      );
    }

    // 1 stage for MODERATE and STRICT. Firstly check time passed since booking
    if (
      !nowIsStayTime &&
      cancelationRulesMeta.relativeBooking != null &&
      cancelationRulesMeta.minTimeBeforeArrivalInHours != null
    ) {
      const hoursHavePassedSinceBooking = DateUtil.getDiffHours(this.bookingDate, now.toISOString());
      const timeLeftBeforeArrival = DateUtil.getDiffHours(now.toISOString(), this.arrivalDate);

      const { relativeBooking, minTimeBeforeArrivalInHours } = cancelationRulesMeta;

      if (
        hoursHavePassedSinceBooking <= relativeBooking.cancellationTime &&
        timeLeftBeforeArrival >= relativeBooking.arrivingDaysLeftInHours &&
        minTimeBeforeArrivalInHours <= timeLeftBeforeArrival
      ) {
        const [refundsAmount, totalAmountToBeTransferred, totalRevenue] = this.computeRefunds(
          cancelationRulesMeta.cancellationFeeRateSoft,
        );

        return {
          strategyType: RentPeriodStrategyType.SHORT_TERM_RENT,
          cancelationPolicyType: this._cancelationType,
          cancelationDate: now.toISOString(),
          checkOutDate: now.toISOString(),
          refundsAmountToSender: refundsAmount,
          transferAmountToRecipient: totalAmountToBeTransferred,
          transferAmountToPlatform: totalRevenue,
        };
      }
    }

    // 2 stage for INFLEXIBLE.
    if (
      !nowIsStayTime &&
      cancelationRulesMeta.timeBeforeArrivalInHours != null &&
      cancelationRulesMeta.minTimeBeforeArrivalInHours != null
    ) {
      const timeLeftBeforeArrival = DateUtil.getDiffHours(now.toISOString(), this.arrivalDate);

      const [refundsAmount, totalAmountToBeTransferred, totalRevenue] = this.computeRefunds(
        cancelationRulesMeta.cancellationFeeRateSoft,
      );

      if (timeLeftBeforeArrival > cancelationRulesMeta.timeBeforeArrivalInHours) {
        return {
          strategyType: RentPeriodStrategyType.SHORT_TERM_RENT,
          cancelationPolicyType: this._cancelationType,
          cancelationDate: now.toISOString(),
          checkOutDate: now.toISOString(),
          refundsAmountToSender: refundsAmount,
          transferAmountToRecipient: totalAmountToBeTransferred,
          transferAmountToPlatform: totalRevenue,
        };
      }

      if (
        timeLeftBeforeArrival <= cancelationRulesMeta.timeBeforeArrivalInHours &&
        timeLeftBeforeArrival >= cancelationRulesMeta.minTimeBeforeArrivalInHours
      ) {
        const [refundsAmount, totalAmountToBeTransferred, totalRevenue] = this.computeRefunds(
          cancelationRulesMeta.cancellationFeeRateHard,
        );

        return {
          strategyType: RentPeriodStrategyType.SHORT_TERM_RENT,
          cancelationPolicyType: this._cancelationType,
          cancelationDate: now.toISOString(),
          checkOutDate: now.toISOString(),
          refundsAmountToSender: refundsAmount,
          transferAmountToRecipient: totalAmountToBeTransferred,
          transferAmountToPlatform: totalRevenue,
        };
      }
    }

    // 3 stage for STRICT.
    if (
      !nowIsStayTime &&
      cancelationRulesMeta.timeBeforeArrivalInHours == null &&
      cancelationRulesMeta.minTimeBeforeArrivalInHours != null
    ) {
      const timeLeftBeforeArrival = DateUtil.getDiffHours(now.toISOString(), this.arrivalDate);

      if (timeLeftBeforeArrival >= cancelationRulesMeta.minTimeBeforeArrivalInHours) {
        const [refundsAmount, totalAmountToBeTransferred, totalRevenue] = this.computeRefunds(
          cancelationRulesMeta.cancellationFeeRateHard,
        );

        return {
          strategyType: RentPeriodStrategyType.SHORT_TERM_RENT,
          cancelationPolicyType: this._cancelationType,
          cancelationDate: now.toISOString(),
          checkOutDate: now.toISOString(),
          refundsAmountToSender: refundsAmount,
          transferAmountToRecipient: totalAmountToBeTransferred,
          transferAmountToPlatform: totalRevenue,
        };
      }
    }

    // 4 stage for FLEXIBLE, MODERATE.
    if (
      !nowIsStayTime &&
      cancelationRulesMeta.timeBeforeArrivalInHours != null &&
      cancelationRulesMeta.minTimeBeforeArrivalInHours == null
    ) {
      const timeLeftBeforeArrival = DateUtil.getDiffHours(now.toISOString(), this.arrivalDate);

      if (timeLeftBeforeArrival >= cancelationRulesMeta.timeBeforeArrivalInHours) {
        const [refundsAmount, totalAmountToBeTransferred, totalRevenue] = this.computeRefunds(
          cancelationRulesMeta.cancellationFeeRateSoft,
        );

        return {
          strategyType: RentPeriodStrategyType.SHORT_TERM_RENT,
          cancelationPolicyType: this._cancelationType,
          cancelationDate: now.toISOString(),
          checkOutDate: now.toISOString(),
          refundsAmountToSender: refundsAmount,
          transferAmountToRecipient: totalAmountToBeTransferred,
          transferAmountToPlatform: totalRevenue,
        };
      }

      const [refundsAmount, totalAmountToBeTransferred, totalRevenue] = this.computeRefunds(
        cancelationRulesMeta.cancellationFeeRateHard,
      );

      return {
        strategyType: RentPeriodStrategyType.SHORT_TERM_RENT,
        cancelationPolicyType: this._cancelationType,
        cancelationDate: now.toISOString(),
        checkOutDate: now.toISOString(),
        refundsAmountToSender: refundsAmount,
        transferAmountToRecipient: totalAmountToBeTransferred,
        transferAmountToPlatform: totalRevenue,
      };
    }

    // 5 stage refunds amount 0
    const [refundsAmount, totalAmountToBeTransferred, totalRevenue] = this.computeRefunds(0);

    return {
      strategyType: RentPeriodStrategyType.SHORT_TERM_RENT,
      cancelationPolicyType: this._cancelationType,
      cancelationDate: now.toISOString(),
      checkOutDate: now.toISOString(),
      refundsAmountToSender: refundsAmount,
      transferAmountToRecipient: totalAmountToBeTransferred,
      transferAmountToPlatform: totalRevenue,
    };
  }

  protected computeRefunds(feeRate: number) {
    const paidTransactions = this.transactions.filter((i) =>
      [PaymentTransactionStatus.COMPLETED, PaymentTransactionStatus.CASH_OUT_WAITING].includes(i.status),
    );

    const [refundsAmount, totalAmountToBeTransferred, totalRevenue] = paidTransactions.reduce(
      ([refundAmount, totalAmountToBeTransferred, totalRevenue], { totalAmountPayable, rentDays, cost }) => {
        const senderTaxAmount = this._cancelationByAdmin ? 0 : rentDays * cost.cost * this._senderTaxRate;

        const recipientTaxAmount = this._cancelationByAdmin ? 0 : rentDays * cost.cost * this._recipientTaxRate;

        const totalCost = rentDays * cost.cost;

        const cacheInTax = this._cancelationByAdmin ? 0 : (totalCost + senderTaxAmount) * INNOPAY_CASH_IN_TAX_RATE;

        const refundsAmountSum =
          (refundAmount + (totalAmountPayable - senderTaxAmount - totalAmountPayable * INNOPAY_CASH_IN_TAX_RATE)) *
          feeRate; // при возврате либо оставляем себе livin tax либо в случае отмены админом возвращаем livin tax и также отнимаем процент который ушел за выполнение транзакции

        const recipientTransferRate = feeRate === 1 ? 0 : feeRate === 0 ? 1 : feeRate;

        const compensationCashOutToRecipient =
          ((totalCost - recipientTaxAmount) * INNOPAY_CASH_OUT_TAX_RATE) / (1 - INNOPAY_CASH_OUT_TAX_RATE);

        const currentTotalAmountToBeTransferred =
          (totalCost - recipientTaxAmount + compensationCashOutToRecipient) * recipientTransferRate;
        const totalAmountToBeTransferredSum = totalAmountToBeTransferred + currentTotalAmountToBeTransferred;

        // check if need transfer money to the landlord addend the tax by Livin recipient tax-rate
        const totalRevenueSum =
          totalRevenue +
          ((currentTotalAmountToBeTransferred <= 0 ? 0 : recipientTaxAmount) +
            senderTaxAmount -
            (refundsAmountSum ? 0 : cacheInTax) -
            (currentTotalAmountToBeTransferred <= 0 ? 0 : compensationCashOutToRecipient) * recipientTransferRate); // 3000000 доход

        return [costCeil(refundsAmountSum), costCeil(totalAmountToBeTransferredSum), costFloor(totalRevenueSum)];
      },
      [0, 0, 0],
    );

    return [refundsAmount, totalAmountToBeTransferred, totalRevenue];
  }
}
