import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { ApartmentRentPeriodType, ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
import { ArgumentInvalidException } from '@libs/exceptions';
import { IllegalOperationException } from '@libs/exceptions/illegal-operation.exception';
import { Logger } from '@nestjs/common';

import { RentPeriodStrategyType } from '../../rental-manager/types';
import { CommonShortMiddleTermRentLandlordCancelationStrategy } from '../common/common-short-middle-term-rent-landlord-cancelation.stratiegy';

export abstract class BaseShortTermRentCancelationStrategy extends CommonShortMiddleTermRentLandlordCancelationStrategy<RentPeriodStrategyType.SHORT_TERM_RENT> {
  protected arrivalDate: string;
  protected departureDate: string;

  protected logger: Logger;

  protected _cancelationType: ShortTermRentCancellationPolicyType;

  constructor(readonly contract: ContractEntity, readonly transactions: PaymentTransactionEntity[]) {
    super(contract, transactions);
    this.logger = new Logger('ShortTermRentCancelationStrategy');

    if (transactions.some((i) => i.contractId.value !== contract.id.value)) {
      throw new IllegalOperationException('Transactions is not related with contract');
    }

    if (contract.apartmentRentPeriodType !== ApartmentRentPeriodType.SHORT_TERM) {
      const errorMessage = 'Contract must have contain short term rent period type';

      throw new ArgumentInvalidException(errorMessage);
    }

    if (!contract.cancellationPolicy.shortTermCancellationPolicy) {
      const errorMessage = 'Contract must have contain short term cancelation policy';

      throw new ArgumentInvalidException(errorMessage);
    }

    if (!contract.paymentType) {
      const errorMessage = 'Contract must have contain short term payment type';

      throw new ArgumentInvalidException(errorMessage);
    }

    this._cancelationType = contract.cancellationPolicy.shortTermCancellationPolicy;

    this.dateGuard.validateOrThrowError(
      { arrivalDate: this.arrivalDate, departureDate: this.departureDate },
      RentPeriodStrategyType.SHORT_TERM_RENT,
    );
  }

  cancelType = RentPeriodStrategyType.SHORT_TERM_RENT;
}
