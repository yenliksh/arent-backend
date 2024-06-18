"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpPhoneDecorator = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.SignUpPhoneDecorator = (0, common_1.createParamDecorator)((_, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    const request = ctx.getContext().req || context.switchToHttp().getRequest();
    const phone = request.user;
    return phone;
});
//# sourceMappingURL=sign-up-phone.decorator.js.map