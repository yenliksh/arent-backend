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
exports.ApartmentAdComplaintAdminController = void 0;
const openapi = require("@nestjs/swagger");
const admin_set_viewed_apartment_ad_complaint_command_1 = require("../../../rental-context/domains/apartment-ad-complaint/commands/admins/admin-set-viewed-apartment-ad-complaint/admin-set-viewed-apartment-ad-complaint.command");
const guards_1 = require("../../../infrastructure/guards");
const types_1 = require("../../auth/types");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("@nestjsx/crud");
const apartment_ad_complaint_service_1 = require("./apartment-ad-complaint.service");
const apartment_ad_complaint_typeorm_entity_1 = require("./entities/apartment-ad-complaint.typeorm-entity");
let ApartmentAdComplaintAdminController = class ApartmentAdComplaintAdminController {
    constructor(service, commandBus) {
        this.service = service;
        this.commandBus = commandBus;
    }
    async viewedApartmentAdComplaint(apartmentAdComplaintId) {
        const resp = await this.commandBus.execute(new admin_set_viewed_apartment_ad_complaint_command_1.AdminSetViewedApartmentAdComplaintCommand(apartmentAdComplaintId));
        if (resp.isErr()) {
            throw resp.unwrapErr();
        }
        return resp.unwrap().value;
    }
};
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
    }),
    (0, common_1.Patch)(':id/viewed'),
    (0, swagger_1.ApiOperation)({
        summary: 'Viewed apartment ad complaint',
    }),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApartmentAdComplaintAdminController.prototype, "viewedApartmentAdComplaint", null);
ApartmentAdComplaintAdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin-panel.ApartmentAdComplaint'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, crud_1.Crud)({
        model: {
            type: apartment_ad_complaint_typeorm_entity_1.ApartmentAdComplaintTypeormEntity,
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
    (0, common_1.Controller)('admin-panel/apartment-ad-complaint'),
    __metadata("design:paramtypes", [apartment_ad_complaint_service_1.ApartmentAdComplaintAdminService, cqrs_1.CommandBus])
], ApartmentAdComplaintAdminController);
exports.ApartmentAdComplaintAdminController = ApartmentAdComplaintAdminController;
//# sourceMappingURL=apartment-ad-complaint.controller.js.map