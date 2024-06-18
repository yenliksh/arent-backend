import { ExceptionBase } from '@libs/exceptions';
export declare class ReversingInnopayTransactionHasEmptyFieldsError extends ExceptionBase {
    static readonly message = "Reversing innopay transaction entity has empty fields";
    readonly code = "REVERSING_INNOPAY_TRANSACTION.HAS_EMPTY_FIELDS";
    constructor(metadata?: unknown);
}
