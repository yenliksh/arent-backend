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
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const iam_decorator_1 = require("../../../../infrastructure/decorators/iam.decorator");
const guards_1 = require("../../../../infrastructure/guards");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const refresh_token_response_dto_1 = require("../commands/refresh-token/refresh-token.response.dto");
const refresh_token_service_1 = require("../commands/refresh-token/refresh-token.service");
let UserController = class UserController {
    constructor(refreshTokenService) {
        this.refreshTokenService = refreshTokenService;
    }
    async refreshToken(userId) {
        const result = await this.refreshTokenService.handle(userId);
        return refresh_token_response_dto_1.RefreshTokenResponse.create(result.unwrap());
    }
};
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtRefreshAuthGuard),
    (0, common_1.Get)('refresh-token'),
    (0, swagger_1.ApiCreatedResponse)({
        type: refresh_token_response_dto_1.RefreshTokenResponse,
    }),
    openapi.ApiResponse({ status: 200, type: require("../commands/refresh-token/refresh-token.response.dto").RefreshTokenResponse }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "refreshToken", null);
UserController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Webhook. Users'),
    (0, common_1.Controller)('v1/user'),
    __metadata("design:paramtypes", [refresh_token_service_1.RefreshTokenService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map