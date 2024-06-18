"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractRequestStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var ContractRequestStatus;
(function (ContractRequestStatus) {
    ContractRequestStatus["REJECTED"] = "REJECTED";
    ContractRequestStatus["CREATED"] = "CREATED";
    ContractRequestStatus["ACCEPTED"] = "ACCEPTED";
})(ContractRequestStatus = exports.ContractRequestStatus || (exports.ContractRequestStatus = {}));
(0, graphql_1.registerEnumType)(ContractRequestStatus, {
    name: 'ContractRequestStatus',
});
//# sourceMappingURL=types.js.map