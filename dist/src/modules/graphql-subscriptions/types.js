"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTransactionPubSubEvent = exports.ContractPubSubEvent = void 0;
const graphql_1 = require("@nestjs/graphql");
var ContractPubSubEvent;
(function (ContractPubSubEvent) {
    ContractPubSubEvent["DELETED"] = "DELETED";
    ContractPubSubEvent["UPDATED"] = "UPDATED";
})(ContractPubSubEvent = exports.ContractPubSubEvent || (exports.ContractPubSubEvent = {}));
(0, graphql_1.registerEnumType)(ContractPubSubEvent, {
    name: 'ContractPubSubEvent',
});
var PaymentTransactionPubSubEvent;
(function (PaymentTransactionPubSubEvent) {
    PaymentTransactionPubSubEvent["DELETED"] = "DELETED";
    PaymentTransactionPubSubEvent["UPDATED"] = "UPDATED";
})(PaymentTransactionPubSubEvent = exports.PaymentTransactionPubSubEvent || (exports.PaymentTransactionPubSubEvent = {}));
(0, graphql_1.registerEnumType)(PaymentTransactionPubSubEvent, {
    name: 'PaymentTransactionPubSubEvent',
});
//# sourceMappingURL=types.js.map