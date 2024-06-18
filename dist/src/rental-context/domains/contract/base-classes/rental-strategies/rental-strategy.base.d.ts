import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { RentalDateGuard } from '../rental-guards/rental-date.guard';
import { IArrivalDepartureDates, IStayDates, PaymentResponse } from '../rental-manager/types';
export declare abstract class RentalStrategyBase {
    protected readonly contract: ContractEntity;
    protected dateGuard: RentalDateGuard;
    constructor(contract: ContractEntity);
    protected get now(): string;
    protected getRentDays({ arrivalDate, departureDate }: IArrivalDepartureDates): number;
    protected getStayDates({ arrivalDate, departureDate }: IArrivalDepartureDates): IStayDates[];
    abstract handle(): PaymentResponse;
}
