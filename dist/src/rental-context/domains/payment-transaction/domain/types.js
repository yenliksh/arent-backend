"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentInvoiceStatus = exports.PaymentTransactionStatus = exports.PaymentInvoiceType = void 0;
const graphql_1 = require("@nestjs/graphql");
var PaymentInvoiceType;
(function (PaymentInvoiceType) {
    PaymentInvoiceType["WITHDRAW"] = "WITHDRAW";
    PaymentInvoiceType["RECEIVING"] = "RECEIVING";
})(PaymentInvoiceType = exports.PaymentInvoiceType || (exports.PaymentInvoiceType = {}));
(0, graphql_1.registerEnumType)(PaymentInvoiceType, {
    name: 'PaymentInvoiceType',
});
var PaymentTransactionStatus;
(function (PaymentTransactionStatus) {
    PaymentTransactionStatus["CASH_IN_WAITING"] = "CASH_IN_WAITING";
    PaymentTransactionStatus["CASH_OUT_WAITING"] = "CASH_OUT_WAITING";
    PaymentTransactionStatus["COMPLETED"] = "COMPLETED";
    PaymentTransactionStatus["CANCELED"] = "CANCELED";
})(PaymentTransactionStatus = exports.PaymentTransactionStatus || (exports.PaymentTransactionStatus = {}));
(0, graphql_1.registerEnumType)(PaymentTransactionStatus, {
    name: 'PaymentTransactionStatus',
});
var PaymentInvoiceStatus;
(function (PaymentInvoiceStatus) {
    PaymentInvoiceStatus["SUCCESS"] = "SUCCESS";
    PaymentInvoiceStatus["FAILURE"] = "FAILURE";
})(PaymentInvoiceStatus = exports.PaymentInvoiceStatus || (exports.PaymentInvoiceStatus = {}));
(0, graphql_1.registerEnumType)(PaymentInvoiceStatus, {
    name: 'PaymentInvoiceStatus',
});
//# sourceMappingURL=types.js.map