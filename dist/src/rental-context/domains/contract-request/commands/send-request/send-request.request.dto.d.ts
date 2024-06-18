import { IGuests } from '@domain-value-objects/apartment-guests.value-object';
import { ApartmentRentPeriodType, ShortTermRentBookingType, ShortTermRentPaymentType } from '@infrastructure/enums';
export declare class GuestsInput implements IGuests {
    readonly numberOfChildren: number;
    readonly numberOfAdult: number;
    readonly numberOfPets: number;
}
export declare class SendRequest {
    readonly apartmentAdId: string;
    readonly apartmentRentPeriodType: ApartmentRentPeriodType;
    readonly arrivalDate?: string;
    readonly departureDate?: string;
    readonly guests: GuestsInput;
    readonly rentBookingType?: ShortTermRentBookingType;
    readonly comment?: string;
    readonly cardId?: string;
    readonly rentPaymentType?: ShortTermRentPaymentType;
}
