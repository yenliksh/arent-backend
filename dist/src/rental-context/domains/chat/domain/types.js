"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserChatRole = void 0;
const graphql_1 = require("@nestjs/graphql");
var UserChatRole;
(function (UserChatRole) {
    UserChatRole["TENANT"] = "TENANT";
    UserChatRole["LANDLORD"] = "LANDLORD";
})(UserChatRole = exports.UserChatRole || (exports.UserChatRole = {}));
(0, graphql_1.registerEnumType)(UserChatRole, {
    name: 'UserChatRole',
});
//# sourceMappingURL=types.js.map