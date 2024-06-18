import { ExceptionBase } from '@libs/exceptions';
export declare class ApartmentAdPauseError extends ExceptionBase {
    static readonly message = "Apartment ad status cannot be paused";
    readonly code = "APARTMENT_AD.PAUSE_ERROR";
    constructor(metadata?: unknown);
}
