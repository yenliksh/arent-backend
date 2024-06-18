import { ExceptionBase } from '@libs/exceptions';
export declare class ApartmentAdPublishError extends ExceptionBase {
    static readonly message = "Apartment ad status cannot be published";
    readonly code = "APARTMENT_AD.PUBLISH_ERROR";
    constructor(metadata?: unknown);
}
