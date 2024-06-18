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
exports.UserIdentityRequestsAdminController = void 0;
const openapi = require("@nestjs/swagger");
const guards_1 = require("../../../infrastructure/guards");
const file_key_helper_1 = require("../../../libs/utils/file-key.helper");
const get_cf_signed_url_1 = require("../../../libs/utils/get-cf-signed-url");
const admin_panel_header_interceptor_1 = require("../common/interceptors/admin-panel-header.interceptor");
const types_1 = require("../../auth/types");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("@nestjsx/crud");
const profile_identity_approve_command_1 = require("../../../rental-context/domains/user/commands/profile-identity-approve/profile-identity-approve.command");
const profile_identity_reject_command_1 = require("../../../rental-context/domains/user/commands/profile-identity-reject/profile-identity-reject.command");
const dtos_1 = require("./dtos");
const user_identity_request_typeorm_entity_1 = require("./entities/user-identity-request.typeorm-entity");
const user_identity_requests_admin_service_1 = require("./user-identity-requests-admin.service");
let UserIdentityRequestsAdminController = class UserIdentityRequestsAdminController {
    constructor(service, commandBus) {
        this.service = service;
        this.commandBus = commandBus;
    }
    get base() {
        return this;
    }
    async getOne(req) {
        var _a, _b, _c;
        const data = await ((_b = (_a = this.base).getOneBase) === null || _b === void 0 ? void 0 : _b.call(_a, req));
        if (!data) {
            return data;
        }
        return {
            ...data,
            avatarKey: (data === null || data === void 0 ? void 0 : data.avatarKey) ? (0, file_key_helper_1.prependDomainUrlToFileKey)(data.avatarKey) : undefined,
            identityDocuments: (_c = data.identityDocuments) === null || _c === void 0 ? void 0 : _c.map((i) => (0, get_cf_signed_url_1.getCfSignedUrl)((0, file_key_helper_1.prependDomainUrlToFileKey)(i, 'private'))),
        };
    }
    async getMany(req) {
        var _a, _b;
        const data = await ((_b = (_a = this.base).getManyBase) === null || _b === void 0 ? void 0 : _b.call(_a, req));
        if (!data) {
            return data;
        }
        if (Array.isArray(data)) {
            return data.map((i) => {
                var _a;
                return ({
                    ...i,
                    avatarKey: (i === null || i === void 0 ? void 0 : i.avatarKey) ? (0, file_key_helper_1.prependDomainUrlToFileKey)(i === null || i === void 0 ? void 0 : i.avatarKey) : undefined,
                    identityDocuments: (_a = i.identityDocuments) === null || _a === void 0 ? void 0 : _a.map((i) => (0, get_cf_signed_url_1.getCfSignedUrl)((0, file_key_helper_1.prependDomainUrlToFileKey)(i, 'private'))),
                });
            });
        }
        return {
            ...data,
            data: data.data.map((i) => {
                var _a;
                return ({
                    ...i,
                    avatarKey: (i === null || i === void 0 ? void 0 : i.avatarKey) ? (0, file_key_helper_1.prependDomainUrlToFileKey)(i === null || i === void 0 ? void 0 : i.avatarKey) : undefined,
                    identityDocuments: (_a = i.identityDocuments) === null || _a === void 0 ? void 0 : _a.map((i) => (0, get_cf_signed_url_1.getCfSignedUrl)((0, file_key_helper_1.prependDomainUrlToFileKey)(i, 'private'))),
                });
            }),
        };
    }
    async approve(userId) {
        const resp = await this.commandBus.execute(new profile_identity_approve_command_1.ProfileIdentityApproveCommand(userId));
        if (resp.isErr()) {
            throw resp.unwrapErr();
        }
        return resp.isOk();
    }
    async reject(userId, dto) {
        const { rejectReason } = dto;
        const resp = await this.commandBus.execute(new profile_identity_reject_command_1.ProfileIdentityRejectCommand(userId, rejectReason));
        if (resp.isErr()) {
            throw resp.unwrapErr();
        }
        return resp.isOk();
    }
};
__decorate([
    (0, crud_1.Override)('getOneBase'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, crud_1.ParsedRequest)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserIdentityRequestsAdminController.prototype, "getOne", null);
__decorate([
    (0, crud_1.Override)('getManyBase'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, crud_1.ParsedRequest)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserIdentityRequestsAdminController.prototype, "getMany", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'user id',
    }),
    (0, common_1.Patch)(':id/approve'),
    (0, swagger_1.ApiOperation)({
        summary: 'Approve user identity',
    }),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserIdentityRequestsAdminController.prototype, "approve", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'user id',
    }),
    (0, common_1.Patch)(':id/reject'),
    (0, swagger_1.ApiOperation)({
        summary: 'Reject user identity',
    }),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UserIdentityRejectDto]),
    __metadata("design:returntype", Promise)
], UserIdentityRequestsAdminController.prototype, "reject", null);
UserIdentityRequestsAdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin-panel.UserIdentityRequests'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, crud_1.Crud)({
        model: {
            type: user_identity_request_typeorm_entity_1.UserIdentityRequestTypeormEntity,
        },
        query: {
            alwaysPaginate: true,
        },
        routes: {
            only: ['getOneBase', 'getManyBase'],
            getManyBase: {
                interceptors: [new admin_panel_header_interceptor_1.AdminPanelHeaderInterceptor()],
            },
        },
        params: {
            id: {
                type: 'uuid',
                primary: true,
                field: 'id',
            },
        },
    }),
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)(types_1.TokenType.ADMIN)),
    (0, common_1.Controller)('admin-panel/user-identity-requests'),
    __metadata("design:paramtypes", [user_identity_requests_admin_service_1.UserIdentityRequestsAdminService, cqrs_1.CommandBus])
], UserIdentityRequestsAdminController);
exports.UserIdentityRequestsAdminController = UserIdentityRequestsAdminController;
//# sourceMappingURL=user-identity-requests-admin.controller.js.map