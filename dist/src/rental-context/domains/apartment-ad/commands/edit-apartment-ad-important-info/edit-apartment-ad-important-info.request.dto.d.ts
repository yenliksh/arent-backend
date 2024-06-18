import { ShortTermRentBookingType, ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
export declare class EditApartmentAdImportantInfoRequest {
    readonly id: string;
    readonly allowedWithPets: boolean;
    readonly allowedWithChildren: boolean;
    readonly allowedToSmoke: boolean;
    readonly allowedToHangingOut: boolean;
    readonly cancellationPolicy?: ShortTermRentCancellationPolicyType;
    readonly rentBookingType?: ShortTermRentBookingType;
    readonly arrivalTime?: string;
    readonly departureTime?: string;
}
