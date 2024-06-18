import { ExceptionBase } from '@libs/exceptions';
export declare class ApartmentAdConstrainError extends ExceptionBase {
    static readonly message = "Invalid applying changes";
    readonly code = "APARTMENT_AD.CONSTRAINT_ERROR";
    constructor(metadata?: unknown);
}
