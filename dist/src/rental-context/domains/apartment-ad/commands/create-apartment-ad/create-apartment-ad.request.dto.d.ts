import { RentPeriodType } from 'src/rental-context/domains/apartment-ad/domain/types';
export declare class CreateApartmentAdRequest {
    readonly rentPeriodType: RentPeriodType;
    readonly shortTermRentCost?: number;
    readonly longTermRentCost?: number;
}
