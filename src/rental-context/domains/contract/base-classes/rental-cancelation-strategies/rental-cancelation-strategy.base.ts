import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { DateUtil } from '@libs/utils/date-util';

import { RentalDateGuard } from '../rental-guards/rental-date.guard';
import { IArrivalDepartureDates, RentPeriodStrategyType } from '../rental-manager/types';
import { PaymentLandlordCancelationResponse, PaymentTenantCancelationResponse } from './types';

export abstract class RentalCancelationStrategyBase<T extends RentPeriodStrategyType> {
  protected _cancelationByAdmin = false;

  protected dateGuard: RentalDateGuard;

  constructor(protected readonly contract: ContractEntity) {
    this.dateGuard = new RentalDateGuard(contract.rentPeriodVersion, contract.status.value);
  }

  public cancelByAdmin() {
    this._cancelationByAdmin = true;
  }

  abstract transactions: PaymentTransactionEntity[];

  get bookingDate() {
    return this.transactions[0].createdAt.value.toISOString();
  }

  abstract handle(): PaymentLandlordCancelationResponse<T> | PaymentTenantCancelationResponse<T>;

  protected getRentDays({ arrivalDate, departureDate }: IArrivalDepartureDates) {
    return Math.ceil(DateUtil.getDiffBetweenTwoDatesUTC(arrivalDate, departureDate, 'days', true));
  }
}
