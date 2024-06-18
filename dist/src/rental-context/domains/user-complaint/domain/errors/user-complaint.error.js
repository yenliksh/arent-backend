"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserComplaintHasEmptyFieldsError = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
class UserComplaintHasEmptyFieldsError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(UserComplaintHasEmptyFieldsError.message, metadata);
        this.code = 'USER_COMPLAINT.HAS_EMPTY_FIELDS';
    }
}
exports.UserComplaintHasEmptyFieldsError = UserComplaintHasEmptyFieldsError;
UserComplaintHasEmptyFieldsError.message = 'UserComplaint entity has empty fields';
//# sourceMappingURL=user-complaint.error.js.map