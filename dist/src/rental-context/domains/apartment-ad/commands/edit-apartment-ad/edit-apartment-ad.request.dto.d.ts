import { RentPeriodType } from 'src/rental-context/domains/apartment-ad/domain/types';
export declare class EditApartmentAdRequest {
    readonly id: string;
    readonly rentPeriodType: RentPeriodType;
    readonly shortTermRentCost?: number;
    readonly longTermRentCost?: number;
}
