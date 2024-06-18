"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTransactionHasEmptyFieldsError = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
class PaymentTransactionHasEmptyFieldsError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(PaymentTransactionHasEmptyFieldsError.message, metadata);
        this.code = 'PAYMENT_TRANSACTION.HAS_EMPTY_FIELDS';
    }
}
exports.PaymentTransactionHasEmptyFieldsError = PaymentTransactionHasEmptyFieldsError;
PaymentTransactionHasEmptyFieldsError.message = 'Payment transaction entity has empty fields';
//# sourceMappingURL=payment-transaction.errors.js.map