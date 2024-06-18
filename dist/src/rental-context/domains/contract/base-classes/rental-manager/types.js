"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentPeriodStrategyType = void 0;
const graphql_1 = require("@nestjs/graphql");
var RentPeriodStrategyType;
(function (RentPeriodStrategyType) {
    RentPeriodStrategyType["LONG_TERM_RENT"] = "LONG_TERM_RENT";
    RentPeriodStrategyType["SHORT_TERM_RENT"] = "SHORT_TERM_RENT";
    RentPeriodStrategyType["MIDDLE_TERM_RENT"] = "MIDDLE_TERM_RENT";
})(RentPeriodStrategyType = exports.RentPeriodStrategyType || (exports.RentPeriodStrategyType = {}));
(0, graphql_1.registerEnumType)(RentPeriodStrategyType, {
    name: 'RentPeriodStrategyType',
});
//# sourceMappingURL=types.js.map