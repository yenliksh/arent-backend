import { ExceptionBase } from '@libs/exceptions';
export declare class ApartmentAdHasEmptyFieldsError extends ExceptionBase {
    static readonly message = "Apartment ad entity has empty fields";
    readonly code = "APARTMENT_AD.HAS_EMPTY_FIELDS";
    constructor(metadata?: unknown);
}
