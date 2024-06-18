import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { PaymentTransactionStatus } from '@domains/payment-transaction/domain/types';
import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { ArgumentInvalidException } from '@libs/exceptions';
import { IllegalOperationException } from '@libs/exceptions/illegal-operation.exception';
import { DateUtil } from '@libs/utils/date-util';
import { Dayjs } from 'dayjs';
import {
  FINE_RATE,
  INNOPAY_CASH_IN_TAX_RATE,
  INNOPAY_CASH_OUT_TAX_RATE,
  LIVIN_SHORT_TERM_RENT_RECIPIENT_TAX_RATE,
  LIVIN_SHORT_TERM_RENT_SENDER_TAX_RATE,
} from 'src/rental-context/constants';

import { RentPeriodStrategyType } from '../../rental-manager/types';
import { costCeil } from '../../rental-strategies/utils/cost-rounds.util';
import { RentalCancelationStrategyBase } from '../rental-cancelation-strategy.base';
import { PeriodTypes } from '../types';

export abstract class CommonShortMiddleTermRentLandlordCancelationStrategy<
  T extends RentPeriodStrategyType,
> extends RentalCancelationStrategyBase<T> {
  protected arrivalDate: string;
  protected departureDate: string;

  protected _validExcuse = false;
  private _numberOfHoursBeforeTransferMoneyAfterStay = 24; // hours
  private _strictTimeBeforeArrival = 24; // hours

  protected _senderTaxRate = LIVIN_SHORT_TERM_RENT_SENDER_TAX_RATE;
  protected _recipientTaxRate = LIVIN_SHORT_TERM_RENT_RECIPIENT_TAX_RATE;

  abstract cancelType: RentPeriodStrategyType;

  public validExcuse() {
    this._validExcuse = true;
  }

  constructor(readonly contract: ContractEntity, readonly transactions: PaymentTransactionEntity[]) {
    super(contract);

    if (transactions.some((i) => i.contractId.value !== contract.id.value)) {
      throw new IllegalOperationException('Transactions is not related with contract');
    }

    if (contract.apartmentRentPeriodType !== ApartmentRentPeriodType.SHORT_TERM) {
      const errorMessage = 'Contract must have contain short term rent period type';

      throw new ArgumentInvalidException(errorMessage);
    }

    const arrivalDate = this.contract.arrivalDate?.value;
    const departureDate = this.contract.departureDate?.value;

    if (!arrivalDate || !departureDate) {
      const errorMessage = 'Cancelation of rent period cannot be invoked without required fields';

      throw new ArgumentInvalidException(errorMessage);
    }

    this.arrivalDate = arrivalDate;
    this.departureDate = departureDate;

    if (contract.isFined) {
      this._recipientTaxRate += FINE_RATE;
    }
  }

  protected nowIsStayTime = (now = DateUtil.utcNow().millisecond(0)) => {
    return DateUtil.getDiffHours(now.toISOString(), this.arrivalDate) <= 0;
  };

  protected currentPayedTransaction(now = DateUtil.utcNow().millisecond(0)): PaymentTransactionEntity | undefined {
    const nowIsStayTime = this.nowIsStayTime(now);

    const paidTransactions = this.transactions.find((i) =>
      [PaymentTransactionStatus.COMPLETED, PaymentTransactionStatus.CASH_OUT_WAITING].includes(i.status) &&
      nowIsStayTime
        ? now.isBetween(i.startDate.value, i.endDate.value)
        : true,
    );

    return paidTransactions;
  }

  protected periodTypeMap: { [P in PeriodTypes]: (now: Dayjs) => boolean } = {
    [PeriodTypes.BEFORE_ARRIVAL]: (now = DateUtil.utcNow().millisecond(0)) =>
      DateUtil.getDiffHours(now.toISOString(), DateUtil.parse(this.arrivalDate).toISOString()) > 0,
    [PeriodTypes.WITHIN_24_HOURS_OF_STAY]: (now = DateUtil.utcNow().millisecond(0)) =>
      DateUtil.getDiffHours(this.arrivalDate, now.toISOString()) >= 0 &&
      DateUtil.getDiffHours(this.arrivalDate, now.toISOString()) < this._numberOfHoursBeforeTransferMoneyAfterStay,
    [PeriodTypes.WHILE_LIVING]: (now = DateUtil.utcNow().millisecond(0)) =>
      DateUtil.getDiffHours(this.arrivalDate, now.toISOString()) >= this._numberOfHoursBeforeTransferMoneyAfterStay,
  };

  protected computeTaxByAdminCancelation = (
    now = DateUtil.utcNow().millisecond(0),
    currentPayedTransaction: PaymentTransactionEntity,
  ) => {
    const isReturnWithTax =
      DateUtil.getDiffHours(
        now.toISOString(),
        DateUtil.parse(this.arrivalDate).subtract(this._strictTimeBeforeArrival, 'hours').toISOString(),
      ) >= 0 || !this._validExcuse; // если до заезда больше 24 часов возвращаем с livin комиссией если меньше и причина не уважительная возвращаем тоже с комиссией livin в противном случае без комиссии

    const cost =
      this.contract.costAndCurrency.cost *
      this.getRentDays({
        arrivalDate: currentPayedTransaction.startDate.value,
        departureDate: currentPayedTransaction.endDate.value,
      });

    const totalAmountPayable = cost * (1 + this._senderTaxRate);

    const refundsAmountToSender =
      totalAmountPayable / (isReturnWithTax ? 1 : 1 + this._senderTaxRate) -
      currentPayedTransaction.totalAmountPayable * INNOPAY_CASH_IN_TAX_RATE;

    const totalAmountToBeTransferred = 0;

    const totalRevenue = isReturnWithTax ? 0 : totalAmountPayable - refundsAmountToSender;
    totalAmountToBeTransferred;

    return {
      refundsAmountToSender: refundsAmountToSender,
      totalAmountToBeTransferred: totalAmountToBeTransferred,
      totalRevenue: totalRevenue,
    };
  };

  protected computeTaxByLivedHours = (
    now = DateUtil.utcNow().millisecond(0),
    currentPayedTransaction: PaymentTransactionEntity,
  ) => {
    const unusedAmountOfHours = this.getUnusedAmountOfHours(now, currentPayedTransaction);

    const totalHours = this.getTotalHours(currentPayedTransaction);

    const totalAmountPayable = currentPayedTransaction.totalAmountPayable;
    const oldSenderTax = costCeil((totalAmountPayable * this._senderTaxRate) / (1 + this._senderTaxRate));

    const unusedHoursCost = unusedAmountOfHours * this.costPerHour;

    const cashInTax = totalAmountPayable * INNOPAY_CASH_IN_TAX_RATE;
    const livinSenderTax = costCeil(
      ((totalHours - unusedAmountOfHours) * this.costPerHour * this._senderTaxRate) / (1 + this._senderTaxRate),
    );
    const livinRecipientTax = costCeil(
      ((totalHours - unusedAmountOfHours) * this.costPerHour * this._recipientTaxRate) / (1 + this._recipientTaxRate),
    );

    const refundsAmountToSender = unusedHoursCost - cashInTax + (oldSenderTax - livinSenderTax);
    const totalAmountToBeTransferred =
      ((totalHours - unusedAmountOfHours) * this.costPerHour * (1 - this._recipientTaxRate)) /
      (1 - INNOPAY_CASH_OUT_TAX_RATE);

    const totalRevenue = livinSenderTax + livinRecipientTax - totalAmountToBeTransferred * INNOPAY_CASH_OUT_TAX_RATE;

    const withdrawalAmountFromRecipient = unusedHoursCost;

    return {
      refundsAmountToSender: refundsAmountToSender,
      totalAmountToBeTransferred: totalAmountToBeTransferred,
      withdrawalAmountFromRecipient: withdrawalAmountFromRecipient,
      totalRevenue: totalRevenue,
    };
  };

  private get costPerHour() {
    const dayInHours = 24;
    const priceInDay = this.contract.costAndCurrency.cost;

    const costPerHour = (1 * priceInDay) / dayInHours;

    return costPerHour;
  }

  private getUnusedAmountOfHours(
    now = DateUtil.utcNow().millisecond(0),
    transaction: PaymentTransactionEntity,
  ): number {
    const unusedAmountOfHours = DateUtil.getDiffHours(now.toISOString(), transaction.endDate.value, true);

    return unusedAmountOfHours + (this.cancelType === RentPeriodStrategyType.SHORT_TERM_RENT ? 2 : 0);
  }

  private getTotalHours(transaction: PaymentTransactionEntity): number {
    const totalHours =
      DateUtil.getDiffHours(transaction.startDate.value, transaction.endDate.value, true) +
      (this.cancelType === RentPeriodStrategyType.SHORT_TERM_RENT ? 2 : 0);

    return totalHours;
  }
}
