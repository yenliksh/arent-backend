"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserComplaintType = void 0;
const graphql_1 = require("@nestjs/graphql");
var UserComplaintType;
(function (UserComplaintType) {
    UserComplaintType["I_THINK_THEY_ARE_DECEIVING"] = "I_THINK_THEY_ARE_DECEIVING";
    UserComplaintType["THIS_USER_IS_BEHAVING_INDECENTLY"] = "THIS_USER_IS_BEHAVING_INDECENTLY";
    UserComplaintType["THIS_IS_SPAM"] = "THIS_IS_SPAM";
    UserComplaintType["OTHER"] = "OTHER";
})(UserComplaintType = exports.UserComplaintType || (exports.UserComplaintType = {}));
(0, graphql_1.registerEnumType)(UserComplaintType, {
    name: 'UserComplaintType',
});
//# sourceMappingURL=types.js.map