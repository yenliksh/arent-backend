import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { ArgumentInvalidException } from '@libs/exceptions';
import { IllegalOperationException } from '@libs/exceptions/illegal-operation.exception';
import { Logger } from '@nestjs/common';

import { RentPeriodStrategyType } from '../../rental-manager/types';
import { CommonShortMiddleTermRentLandlordCancelationStrategy } from '../common/common-short-middle-term-rent-landlord-cancelation.stratiegy';

export abstract class BaseMiddleTermRentCancelationStrategy extends CommonShortMiddleTermRentLandlordCancelationStrategy<RentPeriodStrategyType.MIDDLE_TERM_RENT> {
  protected logger: Logger;

  constructor(readonly contract: ContractEntity, readonly transactions: PaymentTransactionEntity[]) {
    super(contract, transactions);

    this.logger = new Logger('MiddleTermRentCancelationStrategy');

    if (transactions.some((i) => i.contractId.value !== contract.id.value)) {
      throw new IllegalOperationException('Transactions is not related with contract');
    }

    if (contract.apartmentRentPeriodType !== ApartmentRentPeriodType.SHORT_TERM) {
      const errorMessage = 'Contract must have contain short term rent period type';

      throw new ArgumentInvalidException(errorMessage);
    }

    this.dateGuard.validateOrThrowError(
      { arrivalDate: this.arrivalDate, departureDate: this.departureDate },
      RentPeriodStrategyType.MIDDLE_TERM_RENT,
    );
  }

  cancelType = RentPeriodStrategyType.MIDDLE_TERM_RENT;
}
