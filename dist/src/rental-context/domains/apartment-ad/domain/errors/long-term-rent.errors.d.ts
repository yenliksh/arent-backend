import { ExceptionBase } from '@libs/exceptions';
export declare class LongTermRentError extends ExceptionBase {
    static readonly message = "Apartment ad must be a long term rent type for applying changes";
    readonly code = "APARTMENT_AD.UNEXPECTED_ACTION";
    constructor(metadata?: unknown);
}
