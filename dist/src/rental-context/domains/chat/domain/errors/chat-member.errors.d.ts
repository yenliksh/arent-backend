import { ExceptionBase } from '@libs/exceptions';
export declare class ChatMemberHasEmptyFieldsError extends ExceptionBase {
    static readonly message = "Chat member entity has empty fields";
    readonly code = "CHAT_MEMBER.HAS_EMPTY_FIELDS";
    constructor(metadata?: unknown);
}
