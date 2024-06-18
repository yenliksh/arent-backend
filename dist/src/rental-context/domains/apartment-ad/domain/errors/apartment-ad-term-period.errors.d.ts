import { ExceptionBase } from '@libs/exceptions';
export declare class ApartmentAdTermPeriodError extends ExceptionBase {
    static readonly message = "Apartment ad has wrong term period fields";
    readonly code = "APARTMENT_AD.HAS_WRONG_TERM_PERIOD_FIELDS";
    constructor(metadata?: unknown);
}
