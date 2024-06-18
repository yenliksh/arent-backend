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
exports.AdminsAuthController = void 0;
const openapi = require("@nestjs/swagger");
const iam_decorator_1 = require("../../../../infrastructure/decorators/iam.decorator");
const guards_1 = require("../../../../infrastructure/guards");
const types_1 = require("../../../auth/types");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../dtos");
const admins_typeorm_entity_1 = require("../entities/admins.typeorm-entity");
const services_1 = require("../services");
let AdminsAuthController = class AdminsAuthController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async signIn(input) {
        return this.adminService.signIn(input);
    }
    async getMe(admin) {
        return admin;
    }
};
__decorate([
    (0, common_1.Post)('sign-in'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get me',
    }),
    (0, swagger_1.ApiBody)({ type: dtos_1.AdminsSignInBodyDto }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.AdminsSignInBodyDto]),
    __metadata("design:returntype", Promise)
], AdminsAuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get me',
    }),
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)(types_1.TokenType.ADMIN)),
    openapi.ApiResponse({ status: 200, type: require("../entities/admins.typeorm-entity").AdminTypeormEntity }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admins_typeorm_entity_1.AdminTypeormEntity]),
    __metadata("design:returntype", Promise)
], AdminsAuthController.prototype, "getMe", null);
AdminsAuthController = __decorate([
    (0, swagger_1.ApiTags)('Admins'),
    (0, common_1.Controller)('admin-panel'),
    __metadata("design:paramtypes", [services_1.AdminsAuthService])
], AdminsAuthController);
exports.AdminsAuthController = AdminsAuthController;
//# sourceMappingURL=admins-auth.controller.js.map