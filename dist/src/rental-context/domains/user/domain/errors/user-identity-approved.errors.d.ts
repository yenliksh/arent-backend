import { ExceptionBase } from '@libs/exceptions';
export declare class UserIdentityApprovedError extends ExceptionBase {
    static readonly message = "Fields of an identified user cannot be changed";
    readonly code = "USER.IDENTITY_APPROVED";
    constructor(metadata?: unknown);
}
