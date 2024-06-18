import { ExceptionBase } from '@libs/exceptions';
export declare class ApartmentAdDraftError extends ExceptionBase {
    static readonly message = "Apartment ad should be changes by another method";
    readonly code = "APARTMENT_AD.CAN_NOT_BE_CHANGED";
    constructor(metadata?: unknown);
}
