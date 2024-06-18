import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { ShortTermRentPaymentType } from '@infrastructure/enums';
import { ArgumentInvalidException } from '@libs/exceptions';
import { DateUtil } from '@libs/utils/date-util';
import { Logger } from '@nestjs/common';
import {
  FINE_RATE,
  INNOPAY_CASH_IN_TAX_RATE,
  INNOPAY_CASH_OUT_TAX_RATE,
  LIVIN_SHORT_TERM_RENT_RECIPIENT_TAX_RATE,
  LIVIN_SHORT_TERM_RENT_SENDER_TAX_RATE,
  SHORT_RENT_PARTIAL_ALLOWED_DAYS_BEFORE_ARRIVAL,
} from 'src/rental-context/constants';

import { RentalDateGuard } from '../../rental-guards/rental-date.guard';
import { PaymentResponse, RentPeriodStrategyType } from '../../rental-manager/types';
import { RentalStrategyBase } from '../rental-strategy.base';
import { costCeil, costFloor } from '../utils/cost-rounds.util';

export class ShortTermRentStrategy extends RentalStrategyBase {
  constructor({ contract, paymentType }: { contract: ContractEntity; paymentType?: ShortTermRentPaymentType }) {
    super(contract);
    this.logger = new Logger('ShortTermRentStrategy');

    if (paymentType) {
      this._paymentType = paymentType;
    }

    if (contract.isFined) {
      this._recipientTaxRate += FINE_RATE;
    }
  }

  protected _senderTaxRate = LIVIN_SHORT_TERM_RENT_SENDER_TAX_RATE;
  protected _recipientTaxRate = LIVIN_SHORT_TERM_RENT_RECIPIENT_TAX_RATE;

  protected logger: Logger;

  private _paymentType: ShortTermRentPaymentType = ShortTermRentPaymentType.FULL;

  private _daysBeforeArrivalForSecondWithdrawal = 14;

  private strategyMap: { [P in ShortTermRentPaymentType]: () => PaymentResponse } = {
    [ShortTermRentPaymentType.FULL]: this.generateFullPayment.bind(this),
    [ShortTermRentPaymentType.PARTIAL]: this.generatePartialPayments.bind(this),
  };

  handle(): PaymentResponse {
    return this.strategyMap[this._paymentType]();
  }

  generateFullPayment(): PaymentResponse {
    const cost = this.contract.costAndCurrency?.cost;
    const arrivalDate = this.contract.arrivalDate?.value;
    const departureDate = this.contract.departureDate?.value;

    if (!cost || !arrivalDate || !departureDate) {
      const errorMessage = 'Generate full payment cannot be invoked without required fields';

      throw new ArgumentInvalidException(errorMessage);
    }

    this.dateGuard.validateOrThrowError({ arrivalDate, departureDate }, RentPeriodStrategyType.SHORT_TERM_RENT);

    const rentDays = this.getRentDays({ arrivalDate, departureDate });

    const senderTaxAmount = rentDays * cost * this._senderTaxRate;

    const totalAmountPayable = rentDays * cost + senderTaxAmount;
    const totalAmountToBeTransferred =
      (rentDays * cost * (1 - this._recipientTaxRate)) / (1 - INNOPAY_CASH_OUT_TAX_RATE); // добавляем комиссию кешаута чтоб до лендлорда дошла круглая сумма
    const totalRevenue =
      totalAmountPayable - totalAmountToBeTransferred - totalAmountPayable * INNOPAY_CASH_IN_TAX_RATE; // доход

    return {
      data: [
        {
          taxAmount: costCeil(senderTaxAmount),
          rentDays,
          cost,
          withdrawFundsDate: this.now,
          totalAmountPayable: costCeil(totalAmountPayable),
          totalAmountToBeTransferred: costCeil(totalAmountToBeTransferred),
          totalRevenue: costFloor(totalRevenue),
          senderTaxRate: this._senderTaxRate,
          recipientTaxRate: this._recipientTaxRate,
          startDate: arrivalDate,
          endDate: departureDate,
          isRecurring: false,
          isLastPayment: false,
          rentPeriodStrategyType: RentPeriodStrategyType.SHORT_TERM_RENT,
        },
      ],
    };
  }

  generatePartialPayments(): PaymentResponse {
    const cost = this.contract.costAndCurrency?.cost;
    const arrivalDate = this.contract.arrivalDate?.value;
    const departureDate = this.contract.departureDate?.value;

    if (!cost || !arrivalDate || !departureDate) {
      const errorMessage = 'Generate partial payment cannot be invoked without required fields';

      throw new ArgumentInvalidException(errorMessage);
    }

    RentalDateGuard.mustBeDaysBeforeArrival(
      DateUtil.utcNow().toISOString(),
      arrivalDate,
      SHORT_RENT_PARTIAL_ALLOWED_DAYS_BEFORE_ARRIVAL,
    );

    this.dateGuard.validateOrThrowError({ arrivalDate, departureDate }, RentPeriodStrategyType.SHORT_TERM_RENT);

    const rentDays = this.getRentDays({ arrivalDate, departureDate });

    const halfCost = (rentDays * cost) / 2;

    const senderTaxAmount = halfCost * this._senderTaxRate;

    const totalAmountPayable = halfCost + senderTaxAmount;
    const totalAmountToBeTransferred = (halfCost * (1 - this._recipientTaxRate)) / (1 - INNOPAY_CASH_OUT_TAX_RATE); // добавляем комиссию кешаута чтоб до лендлорда дошла круглая сумма
    const totalRevenue =
      totalAmountPayable - totalAmountToBeTransferred - totalAmountPayable * INNOPAY_CASH_IN_TAX_RATE; // доход

    const withdrawFundsSecondDate = DateUtil.parseUTC(arrivalDate)
      .subtract(this._daysBeforeArrivalForSecondWithdrawal, 'days')
      .startOf('day')
      .add(6, 'hours')
      .toISOString();

    return {
      data: [
        {
          taxAmount: costCeil(senderTaxAmount),
          rentDays,
          cost: costCeil(cost / 2),
          withdrawFundsDate: this.now,
          totalAmountPayable: costCeil(totalAmountPayable),
          totalAmountToBeTransferred: costCeil(totalAmountToBeTransferred),
          totalRevenue: costFloor(totalRevenue),
          senderTaxRate: this._senderTaxRate,
          recipientTaxRate: this._recipientTaxRate,
          startDate: arrivalDate,
          endDate: departureDate,
          isRecurring: false,
          isLastPayment: false,
          rentPeriodStrategyType: RentPeriodStrategyType.SHORT_TERM_RENT,
        },
        {
          taxAmount: senderTaxAmount,
          rentDays,
          cost: costCeil(cost / 2),
          withdrawFundsDate: withdrawFundsSecondDate,
          totalAmountPayable: costCeil(totalAmountPayable),
          totalAmountToBeTransferred: costCeil(totalAmountToBeTransferred),
          totalRevenue: costFloor(totalRevenue),
          senderTaxRate: this._senderTaxRate,
          recipientTaxRate: this._recipientTaxRate,
          startDate: arrivalDate,
          endDate: departureDate,
          isRecurring: true,
          isLastPayment: true,
          rentPeriodStrategyType: RentPeriodStrategyType.SHORT_TERM_RENT,
        },
      ],
    };
  }
}
