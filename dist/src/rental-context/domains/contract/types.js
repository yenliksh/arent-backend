"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractPaymentStatusType = void 0;
const graphql_1 = require("@nestjs/graphql");
var ContractPaymentStatusType;
(function (ContractPaymentStatusType) {
    ContractPaymentStatusType["SHORT_FULL"] = "SHORT_FULL";
    ContractPaymentStatusType["SHORT_PARTIAL"] = "SHORT_PARTIAL";
    ContractPaymentStatusType["RECURRING_COMPLETED"] = "RECURRING_COMPLETED";
    ContractPaymentStatusType["RECURRING"] = "RECURRING";
    ContractPaymentStatusType["REFUND"] = "REFUND";
    ContractPaymentStatusType["CANCELED"] = "CANCELED";
})(ContractPaymentStatusType = exports.ContractPaymentStatusType || (exports.ContractPaymentStatusType = {}));
(0, graphql_1.registerEnumType)(ContractPaymentStatusType, {
    name: 'ContractPaymentStatusType',
});
//# sourceMappingURL=types.js.map