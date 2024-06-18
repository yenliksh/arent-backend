import { ExceptionBase } from '@libs/exceptions';
export declare class ComplaintHasEmptyFieldsError extends ExceptionBase {
    static readonly message = "Complaint entity has empty fields";
    readonly code = "COMPLAINT.HAS_EMPTY_FIELDS";
    constructor(metadata?: unknown);
}
