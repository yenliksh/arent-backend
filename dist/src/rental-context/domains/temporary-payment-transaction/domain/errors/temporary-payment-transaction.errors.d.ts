import { ExceptionBase } from '@libs/exceptions';
export declare class TemporaryPaymentTransactionHasEmptyFieldsError extends ExceptionBase {
    static readonly message = "Temporary payment transaction entity has empty fields";
    readonly code = "TemporaryPaymentTransaction.HAS_EMPTY_FIELDS";
    constructor(metadata?: unknown);
}
