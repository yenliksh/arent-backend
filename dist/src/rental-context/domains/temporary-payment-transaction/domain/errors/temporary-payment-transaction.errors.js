"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporaryPaymentTransactionHasEmptyFieldsError = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
class TemporaryPaymentTransactionHasEmptyFieldsError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(`${TemporaryPaymentTransactionHasEmptyFieldsError.message}: ${metadata}`, metadata);
        this.code = 'TemporaryPaymentTransaction.HAS_EMPTY_FIELDS';
    }
}
exports.TemporaryPaymentTransactionHasEmptyFieldsError = TemporaryPaymentTransactionHasEmptyFieldsError;
TemporaryPaymentTransactionHasEmptyFieldsError.message = 'Temporary payment transaction entity has empty fields';
//# sourceMappingURL=temporary-payment-transaction.errors.js.map