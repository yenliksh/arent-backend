"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentHistorySearchType = void 0;
const graphql_1 = require("@nestjs/graphql");
var PaymentHistorySearchType;
(function (PaymentHistorySearchType) {
    PaymentHistorySearchType["RECURRING"] = "RECURRING";
    PaymentHistorySearchType["SINGLE"] = "SINGLE";
})(PaymentHistorySearchType = exports.PaymentHistorySearchType || (exports.PaymentHistorySearchType = {}));
(0, graphql_1.registerEnumType)(PaymentHistorySearchType, {
    name: 'PaymentHistorySearchType',
});
//# sourceMappingURL=types.js.map