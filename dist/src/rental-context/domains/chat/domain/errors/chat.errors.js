"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatHasEmptyFieldsError = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
class ChatHasEmptyFieldsError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(ChatHasEmptyFieldsError.message, metadata);
        this.code = 'CHAT.HAS_EMPTY_FIELDS';
    }
}
exports.ChatHasEmptyFieldsError = ChatHasEmptyFieldsError;
ChatHasEmptyFieldsError.message = 'Chat entity has empty fields';
//# sourceMappingURL=chat.errors.js.map