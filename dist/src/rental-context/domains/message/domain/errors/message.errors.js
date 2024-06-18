"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageHasEmptyFieldsError = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
class MessageHasEmptyFieldsError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(MessageHasEmptyFieldsError.message, metadata);
        this.code = 'MESSAGE.HAS_EMPTY_FIELDS';
    }
}
exports.MessageHasEmptyFieldsError = MessageHasEmptyFieldsError;
MessageHasEmptyFieldsError.message = 'Message entity has empty fields';
//# sourceMappingURL=message.errors.js.map