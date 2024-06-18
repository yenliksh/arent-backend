"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdentityApprovedError = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
class UserIdentityApprovedError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(UserIdentityApprovedError.message, metadata);
        this.code = 'USER.IDENTITY_APPROVED';
    }
}
exports.UserIdentityApprovedError = UserIdentityApprovedError;
UserIdentityApprovedError.message = 'Fields of an identified user cannot be changed';
//# sourceMappingURL=user-identity-approved.errors.js.map