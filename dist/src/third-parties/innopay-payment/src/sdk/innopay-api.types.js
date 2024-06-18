"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRegistrationStatus = exports.CashInTransactionStatus = exports.CashOutTransactionStatus = exports.InnopayDateTimeFormat = void 0;
exports.InnopayDateTimeFormat = 'DD.MM.YYYY HH:mm:ss';
var CashOutTransactionStatus;
(function (CashOutTransactionStatus) {
    CashOutTransactionStatus["NO_SUCH_TRANSACTION"] = "NO_SUCH_TRANSACTION";
    CashOutTransactionStatus["PENDING_CUSTOMER_INPUT"] = "PENDING_CUSTOMER_INPUT";
    CashOutTransactionStatus["PENDING_APPROVEMENT"] = "PENDING_APPROVEMENT";
    CashOutTransactionStatus["PROCESSED"] = "PROCESSED";
    CashOutTransactionStatus["DECLINED"] = "DECLINED";
    CashOutTransactionStatus["REVERSED"] = "REVERSED";
    CashOutTransactionStatus["INVALID_MID"] = "INVALID_MID";
    CashOutTransactionStatus["MID_DISABLED"] = "MID_DISABLED";
})(CashOutTransactionStatus = exports.CashOutTransactionStatus || (exports.CashOutTransactionStatus = {}));
var CashInTransactionStatus;
(function (CashInTransactionStatus) {
    CashInTransactionStatus["NO_SUCH_TRANSACTION"] = "NO_SUCH_TRANSACTION";
    CashInTransactionStatus["DECLINED"] = "DECLINED";
    CashInTransactionStatus["REVERSED"] = "REVERSED";
    CashInTransactionStatus["PAID"] = "PAID";
    CashInTransactionStatus["REFUNDED"] = "REFUNDED";
    CashInTransactionStatus["PENDING_CUSTOMER_INPUT"] = "PENDING_CUSTOMER_INPUT";
    CashInTransactionStatus["PENDING_AUTH_RESULT"] = "PENDING_AUTH_RESULT";
    CashInTransactionStatus["AUTHORISED"] = "AUTHORISED";
    CashInTransactionStatus["INVALID_MID"] = "INVALID_MID";
    CashInTransactionStatus["MID_DISABLED"] = "MID_DISABLED";
})(CashInTransactionStatus = exports.CashInTransactionStatus || (exports.CashInTransactionStatus = {}));
var CardRegistrationStatus;
(function (CardRegistrationStatus) {
    CardRegistrationStatus["REGISTERED"] = "REGISTERED";
    CardRegistrationStatus["UNCOMPLETED"] = "UNCOMPLETED";
    CardRegistrationStatus["NOT_FOUND"] = "NOT_FOUND";
})(CardRegistrationStatus = exports.CardRegistrationStatus || (exports.CardRegistrationStatus = {}));
//# sourceMappingURL=innopay-api.types.js.map