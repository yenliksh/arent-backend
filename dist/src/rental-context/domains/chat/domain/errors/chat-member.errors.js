"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMemberHasEmptyFieldsError = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
class ChatMemberHasEmptyFieldsError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(ChatMemberHasEmptyFieldsError.message, metadata);
        this.code = 'CHAT_MEMBER.HAS_EMPTY_FIELDS';
    }
}
exports.ChatMemberHasEmptyFieldsError = ChatMemberHasEmptyFieldsError;
ChatMemberHasEmptyFieldsError.message = 'Chat member entity has empty fields';
//# sourceMappingURL=chat-member.errors.js.map