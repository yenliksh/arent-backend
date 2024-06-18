"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdComplaintType = void 0;
const graphql_1 = require("@nestjs/graphql");
var AdComplaintType;
(function (AdComplaintType) {
    AdComplaintType["THERE_IS_AN_ERROR_IN_THE_AD"] = "THERE_IS_AN_ERROR_IN_THE_AD";
    AdComplaintType["THIS_PLACE_DOES_NOT_EXIST"] = "THIS_PLACE_DOES_NOT_EXIST";
    AdComplaintType["THIS_IS_A_FRAUD"] = "THIS_IS_A_FRAUD";
    AdComplaintType["OBSCENE_CONTENT"] = "OBSCENE_CONTENT";
    AdComplaintType["OTHER"] = "OTHER";
})(AdComplaintType = exports.AdComplaintType || (exports.AdComplaintType = {}));
(0, graphql_1.registerEnumType)(AdComplaintType, {
    name: 'AdComplaintType',
});
//# sourceMappingURL=types.js.map