import { ExceptionBase } from '@libs/exceptions';
export declare class PaymentTransactionHasEmptyFieldsError extends ExceptionBase {
    static readonly message = "Payment transaction entity has empty fields";
    readonly code = "PAYMENT_TRANSACTION.HAS_EMPTY_FIELDS";
    constructor(metadata?: unknown);
}
