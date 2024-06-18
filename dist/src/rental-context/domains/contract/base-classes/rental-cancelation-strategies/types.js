"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeriodTypes = exports.LongPeriodTenantCheckOutCancelationType = exports.ShortPeriodTenantCHeckoutCancelationType = exports.AFPredefinedEventNames = void 0;
const graphql_1 = require("@nestjs/graphql");
const types_1 = require("../rental-manager/types");
var AFPredefinedEventNames;
(function (AFPredefinedEventNames) {
    AFPredefinedEventNames["AFEventLogin"] = "af_login";
})(AFPredefinedEventNames = exports.AFPredefinedEventNames || (exports.AFPredefinedEventNames = {}));
var ShortPeriodTenantCHeckoutCancelationType;
(function (ShortPeriodTenantCHeckoutCancelationType) {
})(ShortPeriodTenantCHeckoutCancelationType = exports.ShortPeriodTenantCHeckoutCancelationType || (exports.ShortPeriodTenantCHeckoutCancelationType = {}));
var LongPeriodTenantCheckOutCancelationType;
(function (LongPeriodTenantCheckOutCancelationType) {
    LongPeriodTenantCheckOutCancelationType["CANCELATION_BY_ADMIN"] = "CANCELATION_BY_ADMIN";
    LongPeriodTenantCheckOutCancelationType["ALLOWED_REFUND"] = "ALLOWED_REFUND";
    LongPeriodTenantCheckOutCancelationType["REFUND_BEFORE_THIRTY_DAYS_ARRIVAL"] = "REFUND_BEFORE_THIRTY_DAYS_ARRIVAL";
    LongPeriodTenantCheckOutCancelationType["NOT_ALLOWED_REFUND"] = "NOT_ALLOWED_REFUND";
    LongPeriodTenantCheckOutCancelationType["PARTIAL_REFUND"] = "PARTIAL_REFUND";
    LongPeriodTenantCheckOutCancelationType["CHECK_OUT_LESS_THAN_THIRTY_DAYS_NOTICE"] = "CHECK_OUT_LESS_THAN_THIRTY_DAYS_NOTICE";
    LongPeriodTenantCheckOutCancelationType["CHECK_OUT_GREATER_THAN_THIRTY_DAYS_NOTICE"] = "CHECK_OUT_GREATER_THAN_THIRTY_DAYS_NOTICE";
})(LongPeriodTenantCheckOutCancelationType = exports.LongPeriodTenantCheckOutCancelationType || (exports.LongPeriodTenantCheckOutCancelationType = {}));
(0, graphql_1.registerEnumType)(LongPeriodTenantCheckOutCancelationType, {
    name: 'LongPeriodTenantCheckOutCancelationType',
});
var PeriodTypes;
(function (PeriodTypes) {
    PeriodTypes["BEFORE_ARRIVAL"] = "BEFORE_ARRIVAL";
    PeriodTypes["WITHIN_24_HOURS_OF_STAY"] = "WITHIN_24_HOURS_OF_STAY";
    PeriodTypes["WHILE_LIVING"] = "WHILE_LIVING";
})(PeriodTypes = exports.PeriodTypes || (exports.PeriodTypes = {}));
//# sourceMappingURL=types.js.map