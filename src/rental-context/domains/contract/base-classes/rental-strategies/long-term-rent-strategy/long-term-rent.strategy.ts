import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { ArgumentInvalidException } from '@libs/exceptions';
import { DateUtil } from '@libs/utils/date-util';
import { Logger } from '@nestjs/common';
import {
  FINE_RATE,
  INNOPAY_CASH_IN_TAX_RATE,
  INNOPAY_CASH_OUT_TAX_RATE,
  LIVIN_LONG_TERM_RENT_RECIPIENT_TAX_RATE,
  LIVIN_LONG_TERM_RENT_SENDER_TAX_RATE,
} from 'src/rental-context/constants';

import { PaymentResponse, RentPeriodStrategyType } from '../../rental-manager/types';
import { RentalStrategyBase } from '../rental-strategy.base';
import { costCeil, costFloor } from '../utils/cost-rounds.util';

export class LongTermRentStrategy extends RentalStrategyBase {
  constructor({ contract }: { contract: ContractEntity }) {
    super(contract);

    this.logger = new Logger('LongTermRentStrategy');

    if (contract.isFined) {
      this._recipientTaxRate += FINE_RATE;
    }
  }

  protected _senderTaxRate = LIVIN_LONG_TERM_RENT_SENDER_TAX_RATE;
  protected _recipientTaxRate = LIVIN_LONG_TERM_RENT_RECIPIENT_TAX_RATE;

  protected logger: Logger;

  private _daysBeforeOfWithdrawSubsequentRents = 3;

  handle(): PaymentResponse {
    const cost = this.contract.costAndCurrency?.cost;
    const arrivalDate = this.contract.arrivalDate?.value;
    const departureDate = this.contract.departureDate?.value;

    if (!cost || !arrivalDate || !departureDate) {
      const errorMessage = 'Generate partial payment cannot be invoked without required fields';

      throw new ArgumentInvalidException(errorMessage);
    }

    this.dateGuard.validateOrThrowError({ arrivalDate, departureDate }, RentPeriodStrategyType.LONG_TERM_RENT);

    const stayDates = this.getStayDates({ arrivalDate, departureDate });

    return {
      data: stayDates.map(({ startDate, endDate }, index) => {
        const rentDays = this.getRentDays({ arrivalDate: startDate, departureDate: endDate });

        const senderTaxAmount = cost * this._senderTaxRate;

        const totalAmountPayable = cost + senderTaxAmount;
        const totalAmountToBeTransferred = (cost * (1 - this._recipientTaxRate)) / (1 - INNOPAY_CASH_OUT_TAX_RATE); // добавляем комиссию кешаута чтоб до лендлорда дошла круглая сумма
        const totalRevenue =
          totalAmountPayable - totalAmountToBeTransferred - totalAmountPayable * INNOPAY_CASH_IN_TAX_RATE; // доход

        const withdrawFundsDate = index
          ? DateUtil.parseUTC(startDate)
              .subtract(this._daysBeforeOfWithdrawSubsequentRents, 'day')
              .startOf('day')
              .add(6, 'hours')
              .toISOString()
          : this.now;

        return {
          taxAmount: costCeil(senderTaxAmount),
          rentDays,
          cost: cost,
          withdrawFundsDate,
          totalAmountPayable: costCeil(totalAmountPayable),
          totalAmountToBeTransferred: costCeil(totalAmountToBeTransferred),
          totalRevenue: costFloor(totalRevenue),
          senderTaxRate: this._senderTaxRate,
          recipientTaxRate: this._recipientTaxRate,
          startDate: startDate,
          endDate: endDate,
          isRecurring: !!index,
          isLastPayment: index === stayDates.length - 1,
          rentPeriodStrategyType: RentPeriodStrategyType.LONG_TERM_RENT,
        };
      }),
    };
  }
}
