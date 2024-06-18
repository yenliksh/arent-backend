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
exports.ApartmentAdAdminController = void 0;
const openapi = require("@nestjs/swagger");
const admin_delete_apartment_identificator_command_1 = require("../../../rental-context/domains/apartment-ad/commands/admins/admin-delete-apartment-identificator/admin-delete-apartment-identificator.command");
const admin_edit_apartment_ad_description_command_1 = require("../../../rental-context/domains/apartment-ad/commands/admins/admin-edit-apartment-ad-description/admin-edit-apartment-ad-description.command");
const admin_edit_apartment_ad_meta_tag_command_1 = require("../../../rental-context/domains/apartment-ad/commands/admins/admin-edit-apartment-ad-meta-tag/admin-edit-apartment-ad-meta-tag.command");
const admin_get_apartment_ad_meta_tag_command_1 = require("../../../rental-context/domains/apartment-ad/commands/admins/admin-get-apartment-ad-meta-tag/admin-get-apartment-ad-meta-tag.command");
const apartment_slug_update_command_1 = require("../../../rental-context/domains/apartment-ad/cron/commands/apartment-slug-update.command");
const apartments_titles_update_command_1 = require("../../../rental-context/domains/apartment-ad/cron/commands/apartments-titles-update.command");
const guards_1 = require("../../../infrastructure/guards");
const minimal_unit_helper_1 = require("../../../libs/utils/minimal-unit.helper");
const types_1 = require("../../auth/types");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("@nestjsx/crud");
const file_key_helper_1 = require("../../../libs/utils/file-key.helper");
const admin_delete_apartment_ad_command_1 = require("../../../rental-context/domains/apartment-ad/commands/admins/admin-delete-apartment-ad/admin-delete-apartment-ad.command");
const apartment_ad_admin_service_1 = require("./apartment-ad-admin.service");
const edit_apartment_ad_description_dto_1 = require("./dtos/edit-apartment-ad-description.dto");
const edit_apartment_ad_metatag_dto_1 = require("./dtos/edit-apartment-ad-metatag.dto");
const apartment_ad_typeorm_entity_1 = require("./entities/apartment-ad.typeorm-entity");
let ApartmentAdAdminController = class ApartmentAdAdminController {
    constructor(service, commandBus) {
        this.service = service;
        this.commandBus = commandBus;
    }
    get base() {
        return this;
    }
    async getOne(req) {
        var _a, _b, _c, _d;
        const data = await ((_b = (_a = this.base).getOneBase) === null || _b === void 0 ? void 0 : _b.call(_a, req));
        if (!data) {
            return data;
        }
        const shortTermRent = data.shortTermRent
            ? {
                ...data.shortTermRent,
                cost: (0, minimal_unit_helper_1.toMinorUnit)(data.shortTermRent.cost),
            }
            : undefined;
        const longTermRent = data.longTermRent
            ? {
                ...data.longTermRent,
                cost: (0, minimal_unit_helper_1.toMinorUnit)(data.longTermRent.cost),
            }
            : undefined;
        return {
            ...data,
            shortTermRent,
            longTermRent,
            media: {
                photos: (_c = data.media) === null || _c === void 0 ? void 0 : _c.photos.map((photo) => {
                    return {
                        order: photo.order,
                        fileKey: (0, file_key_helper_1.prependDomainUrlToFileKey)(photo.fileKey),
                    };
                }),
                videos: (_d = data.media) === null || _d === void 0 ? void 0 : _d.videos.map((video) => {
                    return {
                        order: video.order,
                        fileKey: (0, file_key_helper_1.prependDomainUrlToFileKey)(video.fileKey),
                    };
                }),
            },
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
                var _a, _b;
                const shortTermRent = i.shortTermRent
                    ? {
                        ...i.shortTermRent,
                        cost: (0, minimal_unit_helper_1.toMinorUnit)(i.shortTermRent.cost),
                    }
                    : undefined;
                const longTermRent = i.longTermRent
                    ? {
                        ...i.longTermRent,
                        cost: (0, minimal_unit_helper_1.toMinorUnit)(i.longTermRent.cost),
                    }
                    : undefined;
                return {
                    ...i,
                    longTermRent,
                    shortTermRent,
                    media: {
                        photos: (((_a = i.media) === null || _a === void 0 ? void 0 : _a.photos) || []).map((photo) => {
                            return {
                                order: photo.order,
                                fileKey: (0, file_key_helper_1.prependDomainUrlToFileKey)(photo.fileKey),
                            };
                        }),
                        videos: (((_b = i.media) === null || _b === void 0 ? void 0 : _b.videos) || []).map((video) => {
                            return {
                                order: video.order,
                                fileKey: (0, file_key_helper_1.prependDomainUrlToFileKey)(video.fileKey),
                            };
                        }),
                    },
                };
            });
        }
        return {
            ...data,
            data: data.data.map((i) => {
                var _a, _b;
                const shortTermRent = i.shortTermRent
                    ? {
                        ...i.shortTermRent,
                        cost: (0, minimal_unit_helper_1.toMinorUnit)(i.shortTermRent.cost),
                    }
                    : undefined;
                const longTermRent = i.longTermRent
                    ? {
                        ...i.longTermRent,
                        cost: (0, minimal_unit_helper_1.toMinorUnit)(i.longTermRent.cost),
                    }
                    : undefined;
                return {
                    ...i,
                    shortTermRent,
                    longTermRent,
                    media: {
                        photos: (((_a = i.media) === null || _a === void 0 ? void 0 : _a.photos) || []).map((photo) => {
                            return {
                                order: photo.order,
                                fileKey: (0, file_key_helper_1.prependDomainUrlToFileKey)(photo.fileKey),
                            };
                        }),
                        videos: (((_b = i.media) === null || _b === void 0 ? void 0 : _b.videos) || []).map((video) => {
                            return {
                                order: video.order,
                                fileKey: (0, file_key_helper_1.prependDomainUrlToFileKey)(video.fileKey),
                            };
                        }),
                    },
                };
            }),
        };
    }
    async editDescription(apartmentId, dto) {
        const { name, descriptionText } = dto;
        const resp = await this.commandBus.execute(new admin_edit_apartment_ad_description_command_1.AdminEditApartmentAdDescriptionCommand(apartmentId, name, descriptionText));
        if (resp.isErr()) {
            throw resp.unwrapErr();
        }
        return resp.unwrap().value;
    }
    async deleteApartmentAd(apartmentId) {
        const resp = await this.commandBus.execute(new admin_delete_apartment_ad_command_1.AdminDeleteApartmentAdCommand(apartmentId));
        if (resp.isErr()) {
            throw resp.unwrapErr();
        }
        const deleteApIdentificator = await this.commandBus.execute(new admin_delete_apartment_identificator_command_1.AdminDeleteApartmentIdentificatorCommand(apartmentId));
        if (deleteApIdentificator.isErr()) {
            throw resp.unwrapErr();
        }
        return resp.isOk();
    }
    async editMetaTags(apartmentId, dto) {
        const { h1, title, description } = dto;
        const resp = await this.commandBus.execute(new admin_edit_apartment_ad_meta_tag_command_1.AdminEditApartmentAdMetatagCommand(apartmentId, h1, title, description));
        if (resp.isErr()) {
            throw resp.unwrapErr();
        }
        return resp.unwrap().value;
    }
    async getMetaTags(apartmentId) {
        const resp = await this.commandBus.execute(new admin_get_apartment_ad_meta_tag_command_1.AdminGetApartmentAdMetatagCommand(apartmentId));
        if (resp.isErr()) {
            throw resp.unwrapErr();
        }
        return resp.unwrap();
    }
    async updateSlug(apartmentId) {
        await this.commandBus.execute(new apartment_slug_update_command_1.ApartmentSlugUpdateCommand(apartmentId));
        return true;
    }
    async updateTitles() {
        await this.commandBus.execute(new apartments_titles_update_command_1.ApartmentsTitleUpdateCommand());
        return true;
    }
};
__decorate([
    (0, crud_1.Override)('getOneBase'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, crud_1.ParsedRequest)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApartmentAdAdminController.prototype, "getOne", null);
__decorate([
    (0, crud_1.Override)('getManyBase'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, crud_1.ParsedRequest)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApartmentAdAdminController.prototype, "getMany", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
    }),
    (0, common_1.Patch)(':id/edit-apartment-ad-description'),
    (0, swagger_1.ApiBody)({ type: edit_apartment_ad_description_dto_1.EditApartmentAdDescriptionDto }),
    (0, swagger_1.ApiOperation)({
        summary: 'Edit apartment ad description',
    }),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, edit_apartment_ad_description_dto_1.EditApartmentAdDescriptionDto]),
    __metadata("design:returntype", Promise)
], ApartmentAdAdminController.prototype, "editDescription", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
    }),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete apartment ad',
    }),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApartmentAdAdminController.prototype, "deleteApartmentAd", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
    }),
    (0, common_1.Patch)(':id/edit-apartment-ad-metatags'),
    (0, swagger_1.ApiBody)({ type: edit_apartment_ad_metatag_dto_1.EditApartmentAdMetatagDto }),
    (0, swagger_1.ApiOperation)({
        summary: 'Edit apartment ad metatags',
    }),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, edit_apartment_ad_metatag_dto_1.EditApartmentAdMetatagDto]),
    __metadata("design:returntype", Promise)
], ApartmentAdAdminController.prototype, "editMetaTags", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
    }),
    (0, common_1.Get)(':id/get-apartment-ad-metatags'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get apartment ad metatags',
    }),
    openapi.ApiResponse({ status: 200, type: require("../../../rental-context/domains/apartment-ad/domain/entities/apartment-ad-identificator.entity").ApartmentAdIdentificatorEntity }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApartmentAdAdminController.prototype, "getMetaTags", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
    }),
    (0, common_1.Patch)(':id/update-slug'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update apartment slug',
    }),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApartmentAdAdminController.prototype, "updateSlug", null);
__decorate([
    (0, common_1.Patch)('/update-titles'),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApartmentAdAdminController.prototype, "updateTitles", null);
ApartmentAdAdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin-panel.ApartmentAd'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, crud_1.Crud)({
        model: {
            type: apartment_ad_typeorm_entity_1.ApartmentAdTypeormEntity,
        },
        query: {
            alwaysPaginate: true,
            join: {
                shortTermRent: {
                    eager: true,
                },
                longTermRent: {
                    eager: true,
                },
            },
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
    (0, common_1.Controller)('admin-panel/apartment-ad'),
    __metadata("design:paramtypes", [apartment_ad_admin_service_1.ApartmentAdAdminService, cqrs_1.CommandBus])
], ApartmentAdAdminController);
exports.ApartmentAdAdminController = ApartmentAdAdminController;
//# sourceMappingURL=apartment-ad-admin.controller.js.map