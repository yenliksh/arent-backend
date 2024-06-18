import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { ArgumentInvalidException } from '@libs/exceptions';
import { IllegalOperationException } from '@libs/exceptions/illegal-operation.exception';
import { Logger } from '@nestjs/common';
import {
  FINE_RATE,
  LIVIN_LONG_TERM_RENT_RECIPIENT_TAX_RATE,
  LIVIN_LONG_TERM_RENT_SENDER_TAX_RATE,
} from 'src/rental-context/constants';

import { RentPeriodStrategyType } from '../../rental-manager/types';
import { RentalCancelationStrategyBase } from '../rental-cancelation-strategy.base';

export abstract class BaseLongTermRentCancelationStrategy extends RentalCancelationStrategyBase<RentPeriodStrategyType.LONG_TERM_RENT> {
  protected arrivalDate: string;
  protected departureDate: string;

  protected logger: Logger;

  protected _senderTaxRate = LIVIN_LONG_TERM_RENT_SENDER_TAX_RATE;
  protected _recipientTaxRate = LIVIN_LONG_TERM_RENT_RECIPIENT_TAX_RATE;

  constructor(readonly contract: ContractEntity, readonly transactions: PaymentTransactionEntity[]) {
    super(contract);
    this.logger = new Logger('LongTermRentCancelationStrategy');

    if (transactions.some((i) => i.contractId.value !== contract.id.value)) {
      throw new IllegalOperationException('Transactions is not related with contract');
    }

    if (contract.apartmentRentPeriodType !== ApartmentRentPeriodType.LONG_TERM) {
      const errorMessage = 'Contract must have contain long term rent period type';

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
    this.dateGuard.validateOrThrowError({ arrivalDate, departureDate }, RentPeriodStrategyType.LONG_TERM_RENT);

    if (contract.isFined) {
      this._recipientTaxRate += FINE_RATE;
    }
  }
}
