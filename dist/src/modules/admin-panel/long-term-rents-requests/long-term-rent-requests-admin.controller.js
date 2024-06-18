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
exports.LongTermRentRequestsAdminController = void 0;
const openapi = require("@nestjs/swagger");
const guards_1 = require("../../../infrastructure/guards");
const file_key_helper_1 = require("../../../libs/utils/file-key.helper");
const get_cf_signed_url_1 = require("../../../libs/utils/get-cf-signed-url");
const minimal_unit_helper_1 = require("../../../libs/utils/minimal-unit.helper");
const admin_panel_header_interceptor_1 = require("../common/interceptors/admin-panel-header.interceptor");
const types_1 = require("../../auth/types");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("@nestjsx/crud");
const aprove_ad_long_term_rent_command_1 = require("../../../rental-context/domains/apartment-ad/commands/approve-ad-long-term-rent/aprove.ad-long-term-rent.command");
const reject_ad_long_rent_command_1 = require("../../../rental-context/domains/apartment-ad/commands/reject-ad-long-term-rent/reject-ad-long-rent.command");
const apartment_ad_media_model_1 = require("../../../rental-context/domains/apartment-ad/models/sub-models/apartment-ad-media.model");
const reject_long_term_rents_requests_dto_1 = require("./dtos/reject-long-term-rents-requests.dto");
const long_term_rent_request_typeorm_entity_1 = require("./entities/long-term-rent-request.typeorm-entity");
const long_term_rent_requests_admin_service_1 = require("./long-term-rent-requests-admin.service");
let LongTermRentRequestsAdminController = class LongTermRentRequestsAdminController {
    constructor(service, commandBus) {
        this.service = service;
        this.commandBus = commandBus;
    }
    get base() {
        return this;
    }
    async getOne(req) {
        var _a, _b, _c, _d, _e;
        const data = await ((_b = (_a = this.base).getOneBase) === null || _b === void 0 ? void 0 : _b.call(_a, req));
        if (!data) {
            return data;
        }
        return {
            ...data,
            cost: (0, minimal_unit_helper_1.toMinorUnit)(data.cost),
            media: {
                photos: ((_c = data.media) === null || _c === void 0 ? void 0 : _c.photos.map(apartment_ad_media_model_1.ApartmentAdMediaModel.create)) || [],
                videos: ((_d = data.media) === null || _d === void 0 ? void 0 : _d.videos.map(apartment_ad_media_model_1.ApartmentAdMediaModel.create)) || [],
            },
            ownershipDocuments: (_e = data.ownershipDocuments) === null || _e === void 0 ? void 0 : _e.map((i) => (0, get_cf_signed_url_1.getCfSignedUrl)((0, file_key_helper_1.prependDomainUrlToFileKey)(i, 'private'))),
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
                var _a, _b, _c;
                return ({
                    ...i,
                    cost: (0, minimal_unit_helper_1.toMinorUnit)(i.cost),
                    media: {
                        photos: ((_a = i.media) === null || _a === void 0 ? void 0 : _a.photos.map(apartment_ad_media_model_1.ApartmentAdMediaModel.create)) || [],
                        videos: ((_b = i.media) === null || _b === void 0 ? void 0 : _b.videos.map(apartment_ad_media_model_1.ApartmentAdMediaModel.create)) || [],
                    },
                    ownershipDocuments: (_c = i.ownershipDocuments) === null || _c === void 0 ? void 0 : _c.map((i) => (0, get_cf_signed_url_1.getCfSignedUrl)((0, file_key_helper_1.prependDomainUrlToFileKey)(i, 'private'))),
                });
            });
        }
        return {
            ...data,
            data: data.data.map((i) => {
                var _a, _b, _c;
                return ({
                    ...i,
                    cost: (0, minimal_unit_helper_1.toMinorUnit)(i.cost),
                    media: {
                        photos: ((_a = i.media) === null || _a === void 0 ? void 0 : _a.photos.map(apartment_ad_media_model_1.ApartmentAdMediaModel.create)) || [],
                        videos: ((_b = i.media) === null || _b === void 0 ? void 0 : _b.videos.map(apartment_ad_media_model_1.ApartmentAdMediaModel.create)) || [],
                    },
                    ownershipDocuments: (_c = i.ownershipDocuments) === null || _c === void 0 ? void 0 : _c.map((i) => (0, get_cf_signed_url_1.getCfSignedUrl)((0, file_key_helper_1.prependDomainUrlToFileKey)(i, 'private'))),
                });
            }),
        };
    }
    async approve(apartmentId) {
        const resp = await this.commandBus.execute(new aprove_ad_long_term_rent_command_1.ApproveAdLongTermRentCommand(apartmentId));
        if (resp.isErr()) {
            throw resp.unwrapErr();
        }
        return resp.unwrap().value;
    }
    async reject(apartmentId, dto) {
        const resp = await this.commandBus.execute(new reject_ad_long_rent_command_1.RejectAdLongTermRentCommand(apartmentId, dto.declineReason));
        if (resp.isErr()) {
            throw resp.unwrapErr();
        }
        return resp.unwrap().value;
    }
};
__decorate([
    (0, crud_1.Override)('getOneBase'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, crud_1.ParsedRequest)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LongTermRentRequestsAdminController.prototype, "getOne", null);
__decorate([
    (0, crud_1.Override)('getManyBase'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, crud_1.ParsedRequest)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LongTermRentRequestsAdminController.prototype, "getMany", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
    }),
    (0, common_1.Patch)(':id/approve'),
    (0, swagger_1.ApiOperation)({
        summary: 'Approve long term rent period apartment ad',
    }),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LongTermRentRequestsAdminController.prototype, "approve", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
    }),
    (0, common_1.Patch)(':id/reject'),
    (0, swagger_1.ApiBody)({ type: reject_long_term_rents_requests_dto_1.RejectLongTermRentsRequestsDto }),
    (0, swagger_1.ApiOperation)({
        summary: 'Reject long term rent period apartment ad',
    }),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reject_long_term_rents_requests_dto_1.RejectLongTermRentsRequestsDto]),
    __metadata("design:returntype", Promise)
], LongTermRentRequestsAdminController.prototype, "reject", null);
LongTermRentRequestsAdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin-panel.LongTermRentRequests'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, crud_1.Crud)({
        model: {
            type: long_term_rent_request_typeorm_entity_1.LongTermRentRequestTypeormEntity,
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
    (0, common_1.Controller)('admin-panel/long-term-rent-requests'),
    __metadata("design:paramtypes", [long_term_rent_requests_admin_service_1.LongTermRentRequestsAdminService, cqrs_1.CommandBus])
], LongTermRentRequestsAdminController);
exports.LongTermRentRequestsAdminController = LongTermRentRequestsAdminController;
//# sourceMappingURL=long-term-rent-requests-admin.controller.js.map