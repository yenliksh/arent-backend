import { ExceptionBase } from '@libs/exceptions';
export declare class MessageHasEmptyFieldsError extends ExceptionBase {
    static readonly message = "Message entity has empty fields";
    readonly code = "MESSAGE.HAS_EMPTY_FIELDS";
    constructor(metadata?: unknown);
}
