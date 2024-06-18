"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityStatusType = exports.GenderType = void 0;
const graphql_1 = require("@nestjs/graphql");
var GenderType;
(function (GenderType) {
    GenderType["MALE"] = "MALE";
    GenderType["FEMALE"] = "FEMALE";
})(GenderType = exports.GenderType || (exports.GenderType = {}));
(0, graphql_1.registerEnumType)(GenderType, {
    name: 'GenderType',
});
var IdentityStatusType;
(function (IdentityStatusType) {
    IdentityStatusType["APPROVED"] = "APPROVED";
    IdentityStatusType["NOT_CONFIRMED"] = "NOT_CONFIRMED";
    IdentityStatusType["REJECTED"] = "REJECTED";
    IdentityStatusType["PROCESSING"] = "PROCESSING";
})(IdentityStatusType = exports.IdentityStatusType || (exports.IdentityStatusType = {}));
(0, graphql_1.registerEnumType)(IdentityStatusType, {
    name: 'IdentityStatusType',
});
//# sourceMappingURL=types.js.map