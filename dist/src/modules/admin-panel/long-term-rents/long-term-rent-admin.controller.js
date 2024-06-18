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
exports.LongTermRentAdminController = void 0;
const openapi = require("@nestjs/swagger");
const enums_1 = require("../../../infrastructure/enums");
const guards_1 = require("../../../infrastructure/guards");
const file_key_helper_1 = require("../../../libs/utils/file-key.helper");
const get_cf_signed_url_1 = require("../../../libs/utils/get-cf-signed-url");
const minimal_unit_helper_1 = require("../../../libs/utils/minimal-unit.helper");
const types_1 = require("../../auth/types");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("@nestjsx/crud");
const pause_apartment_ad_by_type_command_1 = require("../../../rental-context/domains/apartment-ad/commands/pause-apartment-ad/pause-apartment-ad-by-type.command");
const publish_apartment_ad_by_type_command_1 = require("../../../rental-context/domains/apartment-ad/commands/publish-apartment-ad/publish-apartment-ad-by-type.command");
const long_term_rent_typeorm_entity_1 = require("./entities/long-term-rent.typeorm-entity");
const long_term_rent_admin_service_1 = require("./long-term-rent-admin.service");
let LongTermRentAdminController = class LongTermRentAdminController {
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
            cost: (0, minimal_unit_helper_1.toMinorUnit)(data.cost),
            ownershipDocuments: (_c = data.ownershipDocuments) === null || _c === void 0 ? void 0 : _c.map((i) => (0, get_cf_signed_url_1.getCfSignedUrl)((0, file_key_helper_1.prependDomainUrlToFileKey)(i, 'private'))),
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
                    cost: (0, minimal_unit_helper_1.toMinorUnit)(i.cost),
                    ownershipDocuments: (_a = i.ownershipDocuments) === null || _a === void 0 ? void 0 : _a.map((i) => (0, get_cf_signed_url_1.getCfSignedUrl)((0, file_key_helper_1.prependDomainUrlToFileKey)(i, 'private'))),
                });
            });
        }
        return {
            ...data,
            data: data.data.map((i) => {
                var _a;
                return ({
                    ...i,
                    cost: (0, minimal_unit_helper_1.toMinorUnit)(i.cost),
                    ownershipDocuments: (_a = i.ownershipDocuments) === null || _a === void 0 ? void 0 : _a.map((i) => (0, get_cf_signed_url_1.getCfSignedUrl)((0, file_key_helper_1.prependDomainUrlToFileKey)(i, 'private'))),
                });
            }),
        };
    }
    async pause(apartmentId) {
        const resp = await this.commandBus.execute(new pause_apartment_ad_by_type_command_1.PauseApartmentAdByTypeCommand(apartmentId, enums_1.ApartmentRentPeriodType.LONG_TERM));
        if (resp.isErr()) {
            throw resp.unwrapErr();
        }
        return resp.unwrap().value;
    }
    async publish(apartmentId) {
        const resp = await this.commandBus.execute(new publish_apartment_ad_by_type_command_1.PublishApartmentAdByTypeCommand(apartmentId, enums_1.ApartmentRentPeriodType.LONG_TERM));
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
], LongTermRentAdminController.prototype, "getOne", null);
__decorate([
    (0, crud_1.Override)('getManyBase'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, crud_1.ParsedRequest)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LongTermRentAdminController.prototype, "getMany", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
    }),
    (0, common_1.Patch)(':id/pause'),
    (0, swagger_1.ApiOperation)({
        summary: 'Pause long term rent period apartment ad',
    }),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LongTermRentAdminController.prototype, "pause", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
    }),
    (0, common_1.Patch)(':id/publish'),
    (0, swagger_1.ApiOperation)({
        summary: 'Publish long term rent period apartment ad',
    }),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LongTermRentAdminController.prototype, "publish", null);
LongTermRentAdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin-panel.LongTermRent'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, crud_1.Crud)({
        model: {
            type: long_term_rent_typeorm_entity_1.LongTermRentTypeormEntity,
        },
        query: {
            alwaysPaginate: true,
        },
        routes: {
            only: ['getOneBase', 'getManyBase'],
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
    (0, common_1.Controller)('admin-panel/long-term-rents'),
    __metadata("design:paramtypes", [long_term_rent_admin_service_1.LongTermRentAdminService, cqrs_1.CommandBus])
], LongTermRentAdminController);
exports.LongTermRentAdminController = LongTermRentAdminController;
//# sourceMappingURL=long-term-rent-admin.controller.js.map