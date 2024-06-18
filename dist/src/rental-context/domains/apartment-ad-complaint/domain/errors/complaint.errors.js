"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintHasEmptyFieldsError = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
class ComplaintHasEmptyFieldsError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(ComplaintHasEmptyFieldsError.message, metadata);
        this.code = 'COMPLAINT.HAS_EMPTY_FIELDS';
    }
}
exports.ComplaintHasEmptyFieldsError = ComplaintHasEmptyFieldsError;
ComplaintHasEmptyFieldsError.message = 'Complaint entity has empty fields';
//# sourceMappingURL=complaint.errors.js.map