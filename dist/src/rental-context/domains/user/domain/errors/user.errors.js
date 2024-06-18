"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHasEmptyFieldsError = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
class UserHasEmptyFieldsError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(UserHasEmptyFieldsError.message, metadata);
        this.code = 'USER.HAS_EMPTY_FIELDS';
    }
}
exports.UserHasEmptyFieldsError = UserHasEmptyFieldsError;
UserHasEmptyFieldsError.message = 'User entity has empty fields';
//# sourceMappingURL=user.errors.js.map