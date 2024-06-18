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
exports.UsersAdminController = void 0;
const openapi = require("@nestjs/swagger");
const admin_profile_edit_birthdate_command_1 = require("../../../rental-context/domains/user/commands/admins/admin-profile-edit-birthdate/admin-profile-edit-birthdate.command");
const admin_profile_edit_gender_command_1 = require("../../../rental-context/domains/user/commands/admins/admin-profile-edit-gender/admin-profile-edit-gender.command");
const admin_profile_edit_guarantor_command_1 = require("../../../rental-context/domains/user/commands/admins/admin-profile-edit-guarantor/admin-profile-edit-guarantor.command");
const admin_profile_edit_name_command_1 = require("../../../rental-context/domains/user/commands/admins/admin-profile-edit-name/admin-profile-edit-name.command");
const guards_1 = require("../../../infrastructure/guards");
const file_key_helper_1 = require("../../../libs/utils/file-key.helper");
const get_cf_signed_url_1 = require("../../../libs/utils/get-cf-signed-url");
const admin_panel_header_interceptor_1 = require("../common/interceptors/admin-panel-header.interceptor");
const types_1 = require("../../auth/types");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("@nestjsx/crud");
const admin_profile_delete_command_1 = require("../../../rental-context/domains/user/commands/admins/admin-profile-delete/admin-profile-delete.command");
const admin_profile_edit_dto_1 = require("./dtos/admin-profile-edit.dto");
const user_typeorm_entity_1 = require("./entities/user.typeorm-entity");
const users_admin_service_1 = require("./users-admin.service");
let UsersAdminController = class UsersAdminController {
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
    async editUserInfo(userId, dto) {
        const { userName, birthdate, gender, guarantor } = dto;
        let resp;
        if (userName && userName.firstName && userName.lastName) {
            const { firstName, lastName, middleName } = userName;
            resp = await this.commandBus.execute(new admin_profile_edit_name_command_1.AdminProfileEditNameCommand(userId, firstName, lastName, middleName));
            if (resp.isErr()) {
                throw resp.unwrapErr();
            }
        }
        if (birthdate) {
            resp = await this.commandBus.execute(new admin_profile_edit_birthdate_command_1.AdminProfileEditBirthdateCommand(userId, birthdate));
            if (resp.isErr()) {
                throw resp.unwrapErr();
            }
        }
        if (gender) {
            resp = await this.commandBus.execute(new admin_profile_edit_gender_command_1.AdminProfileEditGenderCommand(userId, gender));
            if (resp.isErr()) {
                throw resp.unwrapErr();
            }
        }
        if (guarantor && guarantor.firstName && guarantor.lastName && guarantor.phone) {
            const { firstName, lastName, phone } = guarantor;
            resp = await this.commandBus.execute(new admin_profile_edit_guarantor_command_1.AdminProfileEditGuarantorCommand(userId, firstName, lastName, phone));
            if (resp.isErr()) {
                throw resp.unwrapErr();
            }
        }
        if (!resp) {
            throw new common_1.UnprocessableEntityException('The request body must contain at least one filled field');
        }
        return resp.unwrap().value;
    }
    async deleteUser(userId) {
        const resp = await this.commandBus.execute(new admin_profile_delete_command_1.AdminProfileDeleteCommand(userId));
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
], UsersAdminController.prototype, "getOne", null);
__decorate([
    (0, crud_1.Override)('getManyBase'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, crud_1.ParsedRequest)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersAdminController.prototype, "getMany", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
    }),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBody)({ type: admin_profile_edit_dto_1.AdminProfileEditUserInfoDto }),
    (0, swagger_1.ApiOperation)({
        summary: 'Edit users info',
    }),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, admin_profile_edit_dto_1.AdminProfileEditUserInfoDto]),
    __metadata("design:returntype", Promise)
], UsersAdminController.prototype, "editUserInfo", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
    }),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete user',
    }),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersAdminController.prototype, "deleteUser", null);
UsersAdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin-panel.Users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, crud_1.Crud)({
        model: {
            type: user_typeorm_entity_1.UserTypeormEntity,
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
    (0, common_1.Controller)('admin-panel/users'),
    __metadata("design:paramtypes", [users_admin_service_1.UsersAdminService, cqrs_1.CommandBus])
], UsersAdminController);
exports.UsersAdminController = UsersAdminController;
//# sourceMappingURL=users-admin.controller.js.map