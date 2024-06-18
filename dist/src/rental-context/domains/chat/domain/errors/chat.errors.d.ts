import { ExceptionBase } from '@libs/exceptions';
export declare class ChatHasEmptyFieldsError extends ExceptionBase {
    static readonly message = "Chat entity has empty fields";
    readonly code = "CHAT.HAS_EMPTY_FIELDS";
    constructor(metadata?: unknown);
}
