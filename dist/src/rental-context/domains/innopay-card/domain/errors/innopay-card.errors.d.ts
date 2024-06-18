import { ExceptionBase } from '@libs/exceptions';
export declare class InnopayCardHasEmptyFieldsError extends ExceptionBase {
    static readonly message = "Innopay entity has empty fields";
    readonly code = "INNOPAY.HAS_EMPTY_FIELDS";
    constructor(metadata?: unknown);
}
