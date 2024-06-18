import { RentPeriodVersionEntity } from '@domains/rent-period-version/domain/rent-period-version.entity';
import { ApartmentRentPeriodType, ContractStatus } from '@infrastructure/enums';
import { IArrivalDepartureDates, RentPeriodStrategyType } from '../rental-manager/types';
export declare class RentalDateGuard {
    private readonly rentPeriods;
    private readonly contractStatus?;
    constructor(rentPeriods: RentPeriodVersionEntity, contractStatus?: ContractStatus | undefined);
    private validatorMap;
    validateOrThrowError({ arrivalDate, departureDate }: IArrivalDepartureDates, rentPeriodStrategyType: RentPeriodStrategyType): void;
    private validatePositiveOrThrowError;
    static validateTimeOrThrowError({ arrivalDate, departureDate }: IArrivalDepartureDates, contractStatus?: ContractStatus): void;
    private getAmountOfRentDays;
    private validateShortTermRent;
    static mustBeDaysBeforeArrival(now: string, arrivalDate: string, mustBeDays: number): void;
    private validateMiddleTermRent;
    private validateLongTermRent;
    private getRangeOfAllowedBookingDays;
    private getAmountOfAllowedBookingDays;
    defineRentPeriodStrategyType({ arrivalDate, departureDate }: IArrivalDepartureDates, apartmentRentPeriodType?: ApartmentRentPeriodType): RentPeriodStrategyType;
}
