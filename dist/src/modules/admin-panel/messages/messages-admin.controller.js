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
exports.MessagesAdminController = void 0;
const openapi = require("@nestjs/swagger");
const guards_1 = require("../../../infrastructure/guards");
const get_cf_signed_url_1 = require("../../../libs/utils/get-cf-signed-url");
const minimal_unit_helper_1 = require("../../../libs/utils/minimal-unit.helper");
const types_1 = require("../../auth/types");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("@nestjsx/crud");
const file_key_helper_1 = require("../../../libs/utils/file-key.helper");
const message_typeorm_entity_1 = require("./entities/message.typeorm-entity");
const messages_admin_service_1 = require("./messages-admin.service");
let MessagesAdminController = class MessagesAdminController {
    constructor(service) {
        this.service = service;
    }
    get base() {
        return this;
    }
    async getOne(req) {
        var _a, _b;
        const data = await ((_b = (_a = this.base).getOneBase) === null || _b === void 0 ? void 0 : _b.call(_a, req));
        if (!data) {
            return data;
        }
        const contractData = data.contractData
            ? { ...data.contractData, cost: data.contractData.cost ? (0, minimal_unit_helper_1.toMinorUnit)(data.contractData.cost) : undefined }
            : undefined;
        return {
            ...data,
            contractData,
            fileKey: (data === null || data === void 0 ? void 0 : data.fileKey) ? (0, get_cf_signed_url_1.getCfSignedUrl)((0, file_key_helper_1.prependDomainUrlToFileKey)(data.fileKey, 'private')) : undefined,
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
                const contractData = i.contractData
                    ? { ...i.contractData, cost: i.contractData.cost ? (0, minimal_unit_helper_1.toMinorUnit)(i.contractData.cost) : undefined }
                    : undefined;
                return {
                    ...i,
                    contractData,
                    fileKey: (i === null || i === void 0 ? void 0 : i.fileKey) ? (0, get_cf_signed_url_1.getCfSignedUrl)((0, file_key_helper_1.prependDomainUrlToFileKey)(i.fileKey, 'private')) : undefined,
                };
            });
        }
        return {
            ...data,
            data: data.data.map((i) => {
                const contractData = i.contractData
                    ? { ...i.contractData, cost: i.contractData.cost ? (0, minimal_unit_helper_1.toMinorUnit)(i.contractData.cost) : undefined }
                    : undefined;
                return {
                    ...i,
                    contractData,
                    fileKey: (i === null || i === void 0 ? void 0 : i.fileKey) ? (0, get_cf_signed_url_1.getCfSignedUrl)((0, file_key_helper_1.prependDomainUrlToFileKey)(i.fileKey, 'private')) : undefined,
                };
            }),
        };
    }
};
__decorate([
    (0, crud_1.Override)('getOneBase'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, crud_1.ParsedRequest)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagesAdminController.prototype, "getOne", null);
__decorate([
    (0, crud_1.Override)('getManyBase'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, crud_1.ParsedRequest)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagesAdminController.prototype, "getMany", null);
MessagesAdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin-panel.Messages'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, crud_1.Crud)({
        model: {
            type: message_typeorm_entity_1.MessageTypeormEntity,
        },
        query: {
            alwaysPaginate: true,
        },
        routes: {
            only: ['getManyBase', 'getOneBase'],
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
    (0, common_1.Controller)('admin-panel/messages'),
    __metadata("design:paramtypes", [messages_admin_service_1.MessagesAdminService])
], MessagesAdminController);
exports.MessagesAdminController = MessagesAdminController;
//# sourceMappingURL=messages-admin.controller.js.map