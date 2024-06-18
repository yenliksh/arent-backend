import { ApartmentRentPeriodType } from '@infrastructure/enums';
export declare class PauseApartmentAdByTypeCommand {
    readonly apartmentAdId: string;
    readonly periodType: ApartmentRentPeriodType;
    constructor(apartmentAdId: string, periodType: ApartmentRentPeriodType);
}
