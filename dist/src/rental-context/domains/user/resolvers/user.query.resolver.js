"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQueryGraphqlResolver = void 0;
const user_orm_entity_1 = require("../../../../infrastructure/database/entities/user.orm-entity");
const iam_decorator_1 = require("../../../../infrastructure/decorators/iam.decorator");
const guards_1 = require("../../../../infrastructure/guards");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const user_model_1 = require("../models/user.model");
let UserQueryGraphqlResolver = class UserQueryGraphqlResolver {
    async getMe(iam) {
        return user_model_1.UserMeModel.create(iam);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Query)(() => user_model_1.UserMeModel, { name: 'user__me' }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity]),
    __metadata("design:returntype", Promise)
], UserQueryGraphqlResolver.prototype, "getMe", null);
UserQueryGraphqlResolver = __decorate([
    (0, graphql_1.Resolver)()
], UserQueryGraphqlResolver);
exports.UserQueryGraphqlResolver = UserQueryGraphqlResolver;
//# sourceMappingURL=user.query.resolver.js.map