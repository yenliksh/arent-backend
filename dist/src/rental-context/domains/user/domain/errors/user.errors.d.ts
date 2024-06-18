import { ExceptionBase } from '@libs/exceptions';
export declare class UserHasEmptyFieldsError extends ExceptionBase {
    static readonly message = "User entity has empty fields";
    readonly code = "USER.HAS_EMPTY_FIELDS";
    constructor(metadata?: unknown);
}
