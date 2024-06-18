"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAM = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.IAM = (0, common_1.createParamDecorator)((data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    const request = ctx.getContext().req || context.switchToHttp().getRequest();
    const user = request.user;
    if (data) {
        return user === null || user === void 0 ? void 0 : user[data];
    }
    return user;
});
//# sourceMappingURL=iam.decorator.js.map