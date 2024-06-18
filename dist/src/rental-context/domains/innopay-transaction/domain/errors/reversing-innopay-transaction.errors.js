"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReversingInnopayTransactionHasEmptyFieldsError = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
class ReversingInnopayTransactionHasEmptyFieldsError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(`${ReversingInnopayTransactionHasEmptyFieldsError.message}: ${metadata}`, metadata);
        this.code = 'REVERSING_INNOPAY_TRANSACTION.HAS_EMPTY_FIELDS';
    }
}
exports.ReversingInnopayTransactionHasEmptyFieldsError = ReversingInnopayTransactionHasEmptyFieldsError;
ReversingInnopayTransactionHasEmptyFieldsError.message = 'Reversing innopay transaction entity has empty fields';
//# sourceMappingURL=reversing-innopay-transaction.errors.js.map