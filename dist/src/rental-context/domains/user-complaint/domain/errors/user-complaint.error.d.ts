import { ExceptionBase } from '@libs/exceptions';
export declare class UserComplaintHasEmptyFieldsError extends ExceptionBase {
    static readonly message = "UserComplaint entity has empty fields";
    readonly code = "USER_COMPLAINT.HAS_EMPTY_FIELDS";
    constructor(metadata?: unknown);
}
