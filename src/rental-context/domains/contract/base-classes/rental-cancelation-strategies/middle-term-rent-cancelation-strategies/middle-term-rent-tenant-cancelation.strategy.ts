import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { PaymentTransactionStatus } from '@domains/payment-transaction/domain/types';
import { MiddleTermRentCancellationPolicyType } from '@infrastructure/enums';
import { ArgumentInvalidException } from '@libs/exceptions';
import { IllegalOperationException } from '@libs/exceptions/illegal-operation.exception';
import { DateUtil } from '@libs/utils/date-util';
import { INNOPAY_CASH_IN_TAX_RATE, INNOPAY_CASH_OUT_TAX_RATE } from 'src/rental-context/constants';

import { RentPeriodStrategyType } from '../../rental-manager/types';
import { costCeil, costFloor } from '../../rental-strategies/utils/cost-rounds.util';
import {
  ICancelationRulesMeta,
  LongPeriodTenantCheckOutCancelationType,
  PaymentTenantCancelationResponse,
} from '../types';
import { BaseMiddleTermRentCancelationStrategy } from './base-middle-term-rent-cancelation.strategy';

export class MiddleTermRentTenantCancelationStrategy extends BaseMiddleTermRentCancelationStrategy {
  constructor(readonly contract: ContractEntity, transactions: PaymentTransactionEntity[]) {
    super(
      contract,
      [...transactions].sort((a, b) => a.startDate.getDate().getTime() - b.startDate.getDate().getTime()),
    );
  }

  private _cancelationType = MiddleTermRentCancellationPolicyType.DEFAULT;

  static cancelationRulesMap: { [P in MiddleTermRentCancellationPolicyType]: ICancelationRulesMeta } = {
    [MiddleTermRentCancellationPolicyType.DEFAULT]: {
      relativeBooking: {
        cancellationTime: 24,
        arrivingDaysLeftInHours: 336,
      },

      cancellationFeeRateSoft: 1,
      cancellationFeeRateHard: 0,

      seriousReasonTimeInHours: 24,
    },
  };

  private getCurrentStayTransaction(now = DateUtil.utcNow()) {
    const currentStayTransactionIndex = this.transactions.findIndex((i) =>
      now.isBetween(i.startDate.value, i.endDate.value),
    );

    const currentStayTransaction = this.transactions?.[currentStayTransactionIndex];

    if (!currentStayTransaction) {
      throw new IllegalOperationException('The current date is not within the date of stay');
    }

    return currentStayTransaction;
  }

  private getNextStayTransaction(now = DateUtil.utcNow()): PaymentTransactionEntity | null {
    const currentStayTransactionIndex = this.transactions.findIndex((i) =>
      now.isBetween(i.startDate.value, i.endDate.value),
    );

    const nextStayTransaction = this.transactions?.[currentStayTransactionIndex + 1];

    if (!nextStayTransaction) {
      return null;
    }

    return nextStayTransaction;
  }

  private getFirstPaidTransaction(): PaymentTransactionEntity {
    const sortedTransactions = [...this.transactions]
      .filter((i) => [PaymentTransactionStatus.COMPLETED, PaymentTransactionStatus.CASH_OUT_WAITING].includes(i.status))
      .sort((a, b) => (DateUtil.parseUTC(a.startDate.value).isBefore(b.startDate.value) ? -1 : 1));

    const firstPaidTransaction =
      sortedTransactions?.[0] &&
      [PaymentTransactionStatus.COMPLETED, PaymentTransactionStatus.CASH_OUT_WAITING].includes(
        sortedTransactions?.[0].status,
      )
        ? sortedTransactions[0]
        : null;

    if (!firstPaidTransaction) {
      throw new IllegalOperationException('Cannot be found first paid transactions');
    }

    return firstPaidTransaction;
  }

  private getLastPaidTransaction(): PaymentTransactionEntity {
    const sortedTransactions = [...this.transactions]
      .filter((i) => [PaymentTransactionStatus.COMPLETED, PaymentTransactionStatus.CASH_OUT_WAITING].includes(i.status))
      .sort((a, b) => (DateUtil.parseUTC(a.startDate.value).isBefore(b.startDate.value) ? 1 : -1));

    const firstPaidTransaction =
      sortedTransactions?.[0] &&
      [PaymentTransactionStatus.COMPLETED, PaymentTransactionStatus.CASH_OUT_WAITING].includes(
        sortedTransactions?.[0].status,
      )
        ? sortedTransactions[0]
        : null;

    if (!firstPaidTransaction) {
      throw new IllegalOperationException('Cannot be found last paid transactions');
    }

    return firstPaidTransaction;
  }

  private getUnpaidAmountOfHours(now = DateUtil.utcNow()) {
    const currentStayTransaction = this.getCurrentStayTransaction(now);

    if (
      ![PaymentTransactionStatus.COMPLETED, PaymentTransactionStatus.CASH_OUT_WAITING].includes(
        currentStayTransaction.status,
      )
    ) {
      throw new IllegalOperationException('To cancel of rent, you must pay the current month');
    }

    const minStayCompensationHours = DateUtil.getDiffHours(now.toISOString(), this.getMinAllowedCheckoutDate(now));

    const paidAmountOfHours = DateUtil.getDiffHours(now.toISOString(), currentStayTransaction.endDate.value);

    const nextStayTransaction = this.getNextStayTransaction(now);

    const unpaidAmountOfHours = minStayCompensationHours - paidAmountOfHours;

    if (
      nextStayTransaction &&
      [PaymentTransactionStatus.COMPLETED, PaymentTransactionStatus.CASH_OUT_WAITING].includes(
        nextStayTransaction.status,
      )
    ) {
      const additionalPaidAmountOfHours = DateUtil.getDiffHours(
        nextStayTransaction.startDate.value,
        nextStayTransaction.endDate.value,
      );

      return unpaidAmountOfHours - additionalPaidAmountOfHours;
    }

    return unpaidAmountOfHours;
  }

  private getCostPerHour() {
    const transaction = this.transactions?.[0];

    if (!transaction) {
      throw new IllegalOperationException('For getting cost per hour transaction does not exist');
    }

    return transaction.cost.cost / 24;
  }

  // checkOutDate must be in UTC
  handle(checkOutDate?: string): PaymentTenantCancelationResponse<RentPeriodStrategyType.MIDDLE_TERM_RENT> {
    const cancelationRulesMeta = MiddleTermRentTenantCancelationStrategy.cancelationRulesMap[this._cancelationType];

    const now = DateUtil.utcNow().millisecond(0);
    const nowIsStayTime = DateUtil.getDiffHours(now.toISOString(), this.arrivalDate) <= 0;

    // 0 stage for ADMIN RESOLVE MANUALLY
    if (this._cancelationByAdmin) {
      const stayHours = DateUtil.getDiffHours(this.arrivalDate, now.toISOString());

      const [refundsAmount, totalAmountToBeTransferred, totalRevenue] = this.computeRefundByAdmin();

      if (stayHours <= cancelationRulesMeta.seriousReasonTimeInHours) {
        return {
          strategyType: RentPeriodStrategyType.MIDDLE_TERM_RENT,
          cancelationPolicyType: this._cancelationType,
          cancelationDate: now.toISOString(),
          checkOutDate: now.toISOString(),
          refundsAmountToSender: refundsAmount,
          transferAmountToRecipient: totalAmountToBeTransferred,
          transferAmountToPlatform: totalRevenue,
          checkoutType: LongPeriodTenantCheckOutCancelationType.CANCELATION_BY_ADMIN,
        };
      }

      throw new IllegalOperationException(
        'Cancellation by the administrator cannot be performed due to: more than 24 hours have passed since the stay',
      );
    }

    // 1 stage. For refund if less than 24 hours have passed since booking
    if (!nowIsStayTime && cancelationRulesMeta.relativeBooking != null) {
      const hoursHavePassedSinceBooking = DateUtil.getDiffHours(this.bookingDate, now.toISOString());
      const timeLeftBeforeArrival = DateUtil.getDiffHours(now.toISOString(), this.arrivalDate);

      const { relativeBooking } = cancelationRulesMeta;

      if (
        hoursHavePassedSinceBooking <= relativeBooking.cancellationTime &&
        timeLeftBeforeArrival >= relativeBooking.arrivingDaysLeftInHours
      ) {
        const [refundsAmount, totalAmountToBeTransferred, totalRevenue] = this.computeRefundByFirstTransaction();

        return {
          strategyType: RentPeriodStrategyType.MIDDLE_TERM_RENT,
          cancelationPolicyType: this._cancelationType,
          cancelationDate: now.toISOString(),
          checkOutDate: now.toISOString(),
          refundsAmountToSender: refundsAmount,
          transferAmountToRecipient: totalAmountToBeTransferred,
          transferAmountToPlatform: totalRevenue,
          checkoutType: LongPeriodTenantCheckOutCancelationType.ALLOWED_REFUND,
        };
      }
    }

    // 2 stage. Withdraw all funds for the first transaction to the landlord/platform
    const timesBeforeFirstArrival = DateUtil.getDiffHours(now.toISOString(), this.arrivalDate);
    const isNotYetStayTime = timesBeforeFirstArrival > 0;

    // calculate refund/withdrawal by first payed transaction (if transaction completed)
    if (isNotYetStayTime) {
      const firstPaidTransaction = this.getFirstPaidTransaction();
      const livinRecipientTaxRate = 1 - this._recipientTaxRate;
      const innopayCashOutCompensationTaxRate = 1 - INNOPAY_CASH_OUT_TAX_RATE;

      const totalCost = firstPaidTransaction.cost.cost * firstPaidTransaction.rentDays;

      const transferAmountToRecipient = (totalCost * livinRecipientTaxRate) / innopayCashOutCompensationTaxRate;

      const transferAmountToPlatform =
        firstPaidTransaction.totalAmountPayable -
        transferAmountToRecipient -
        firstPaidTransaction.totalAmountPayable * INNOPAY_CASH_IN_TAX_RATE;

      return {
        strategyType: RentPeriodStrategyType.MIDDLE_TERM_RENT,
        cancelationPolicyType: this._cancelationType,
        cancelationDate: now.toISOString(),
        checkOutDate: now.toISOString(),
        refundsAmountToSender: 0,
        transferAmountToRecipient: costCeil(transferAmountToRecipient),
        transferAmountToPlatform: costFloor(transferAmountToPlatform),
        checkoutType: LongPeriodTenantCheckOutCancelationType.NOT_ALLOWED_REFUND,
      };
    }

    // validate checkout date
    if (!checkOutDate) {
      throw new ArgumentInvalidException('For long-term rental cancellation policy, a check-out date is required');
    }

    const diffCheckoutDate = DateUtil.getDiffHours(now.toISOString(), checkOutDate);

    if (diffCheckoutDate < 0) {
      throw new IllegalOperationException('Check-out date cannot be less then current date');
    }

    const isBetweenArrivalAndDepartureDates = DateUtil.parseUTC(checkOutDate).isBetween(
      this.arrivalDate,
      this.departureDate,
    );

    if (!isBetweenArrivalAndDepartureDates) {
      throw new IllegalOperationException('Check-out date should be between arrival and departure dates');
    }

    // 3 stage. Cancelation during stay in apartment
    // 3.1 if checkout date less than allowed check-out date we need withdraw money with compensation by 30 days rules
    const minAllowedCheckoutDate = this.getMinAllowedCheckoutDate(now);

    const isImmediateWithdrawal = DateUtil.parseUTC(minAllowedCheckoutDate).isAfter(checkOutDate);

    if (isImmediateWithdrawal) {
      const unpaidAmountOfHours = this.getUnpaidAmountOfHours(now); // can be negative
      const costPerHour = this.getCostPerHour();

      const unpaidAmountOfHoursCost = unpaidAmountOfHours ? unpaidAmountOfHours * costPerHour : 0;

      const livinSenderTaxAmount = unpaidAmountOfHoursCost * this._senderTaxRate;
      const livinRecipientTaxAmount = unpaidAmountOfHoursCost * this._recipientTaxRate;

      const withdrawalAmountFromSender = unpaidAmountOfHoursCost + livinSenderTaxAmount;

      const cashInTax = withdrawalAmountFromSender * INNOPAY_CASH_IN_TAX_RATE;

      const transferAmountToRecipient = withdrawalAmountFromSender - livinSenderTaxAmount - livinRecipientTaxAmount;

      const cashOutTaxCompensation =
        (transferAmountToRecipient / (1 - INNOPAY_CASH_OUT_TAX_RATE)) * INNOPAY_CASH_OUT_TAX_RATE;

      let transferAmountToPlatform =
        livinSenderTaxAmount + livinRecipientTaxAmount - cashOutTaxCompensation - cashInTax;
      let transferAmountToRecipientWithCompensation = transferAmountToRecipient + cashOutTaxCompensation;

      // if exist unpaid transaction just sum cash-out for landlord and livin. By reason the payment transaction will not be completed in the future.
      const lastPaidTransaction = this.getLastPaidTransaction();
      const isMoneyOnSubAccount = lastPaidTransaction.status === PaymentTransactionStatus.CASH_OUT_WAITING;

      if (isMoneyOnSubAccount) {
        transferAmountToRecipientWithCompensation += lastPaidTransaction.totalAmountToBeTransferred;
        transferAmountToPlatform += lastPaidTransaction.totalRevenue;
      }

      return {
        strategyType: RentPeriodStrategyType.MIDDLE_TERM_RENT,
        cancelationPolicyType: this._cancelationType,
        cancelationDate: now.toISOString(),
        checkOutDate,
        withdrawalAmountFromSender: costCeil(withdrawalAmountFromSender),
        refundsAmountToSender: 0,
        transferAmountToRecipient: costCeil(transferAmountToRecipientWithCompensation),
        transferAmountToPlatform: costFloor(transferAmountToPlatform),
        checkoutType: LongPeriodTenantCheckOutCancelationType.CHECK_OUT_LESS_THAN_THIRTY_DAYS_NOTICE,
      };
    }

    // 3.2 recompute a future transaction because the check-out date is more than a month away
    const recomputedLastStayTransaction = this.recomputeLastTransaction(now, checkOutDate, minAllowedCheckoutDate);

    return {
      strategyType: RentPeriodStrategyType.MIDDLE_TERM_RENT,
      cancelationPolicyType: this._cancelationType,
      cancelationDate: now.toISOString(),
      checkOutDate,
      recomputedLastStayTransaction,
      refundsAmountToSender: 0,
      transferAmountToRecipient: 0,
      transferAmountToPlatform: 0,
      checkoutType: LongPeriodTenantCheckOutCancelationType.CHECK_OUT_GREATER_THAN_THIRTY_DAYS_NOTICE,
    };
  }

  private recomputeLastTransaction(
    now = DateUtil.utcNow(),
    checkoutDate: string,
    compensationPaymentDate: string,
  ): PaymentTransactionEntity {
    const currentStayTransactionIndex = this.transactions.findIndex((i) =>
      now.isBetween(i.startDate.value, i.endDate.value),
    );

    const currentStayTransaction = this.transactions?.[currentStayTransactionIndex];

    if (!currentStayTransaction) {
      throw new IllegalOperationException('The current date is not within the date of stay');
    }

    const finalCheckoutDate = DateUtil.parseUTC(compensationPaymentDate).isBefore(checkoutDate)
      ? checkoutDate
      : compensationPaymentDate;

    const lastCheckoutTransaction = this.transactions.find(
      (i) =>
        DateUtil.parseUTC(finalCheckoutDate).isBetween(i.startDate.value, i.endDate.value, undefined, '[]') &&
        i.status === PaymentTransactionStatus.CASH_IN_WAITING,
    );

    if (!lastCheckoutTransaction) {
      throw new IllegalOperationException('Allowed payment transaction cannot be found');
    }

    lastCheckoutTransaction.setCheckOutDate(finalCheckoutDate);

    return lastCheckoutTransaction;
  }

  private getMinAllowedCheckoutDate(now = DateUtil.utcNow()): string {
    const allowedCheckoutDate = now.add(1, 'month');

    const currentStayTransactionIndex = this.transactions.findIndex((i) =>
      now.isBetween(i.startDate.value, i.endDate.value),
    );

    const currentStayTransaction = this.transactions?.[currentStayTransactionIndex];

    if (!currentStayTransaction) {
      throw new IllegalOperationException('The current date is not within the date of stay');
    }

    const currentNextTransaction = this.transactions?.[currentStayTransactionIndex + 1];

    if (!currentNextTransaction) {
      return currentStayTransaction.endDate.value;
    }

    if (allowedCheckoutDate.isBetween(currentNextTransaction.startDate.value, currentNextTransaction.endDate.value)) {
      return allowedCheckoutDate.toISOString();
    }

    return currentNextTransaction.endDate.value;
  }

  protected computeRefundByAdmin() {
    const paidTransaction = this.getFirstPaidTransaction();

    const refundsAmount = costCeil(
      paidTransaction.totalAmountPayable - paidTransaction.totalAmountPayable * INNOPAY_CASH_IN_TAX_RATE,
    );

    const totalAmountToBeTransferred = 0;

    const totalRevenue = 0;

    return [refundsAmount, totalAmountToBeTransferred, totalRevenue];
  }

  protected computeRefundByFirstTransaction() {
    const { totalAmountPayable, taxAmount } = this.getFirstPaidTransaction();

    const refundsAmount = costCeil(totalAmountPayable - taxAmount - totalAmountPayable * INNOPAY_CASH_IN_TAX_RATE);

    const totalAmountToBeTransferred = 0;
    const totalRevenue = taxAmount;

    return [refundsAmount, totalAmountToBeTransferred, totalRevenue];
  }
}
