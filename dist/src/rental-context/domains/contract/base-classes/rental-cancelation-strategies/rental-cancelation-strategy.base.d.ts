import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { RentalDateGuard } from '../rental-guards/rental-date.guard';
import { IArrivalDepartureDates, RentPeriodStrategyType } from '../rental-manager/types';
import { PaymentLandlordCancelationResponse, PaymentTenantCancelationResponse } from './types';
export declare abstract class RentalCancelationStrategyBase<T extends RentPeriodStrategyType> {
    protected readonly contract: ContractEntity;
    protected _cancelationByAdmin: boolean;
    protected dateGuard: RentalDateGuard;
    constructor(contract: ContractEntity);
    cancelByAdmin(): void;
    abstract transactions: PaymentTransactionEntity[];
    get bookingDate(): string;
    abstract handle(): PaymentLandlordCancelationResponse<T> | PaymentTenantCancelationResponse<T>;
    protected getRentDays({ arrivalDate, departureDate }: IArrivalDepartureDates): number;
}
