"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdAdminModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const apartment_ad_admin_controller_1 = require("./apartment-ad-admin.controller");
const apartment_ad_admin_service_1 = require("./apartment-ad-admin.service");
const apartment_ad_typeorm_repository_1 = require("./repositories/apartment-ad.typeorm-repository");
let ApartmentAdAdminModule = class ApartmentAdAdminModule {
};
ApartmentAdAdminModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, typeorm_1.TypeOrmModule.forFeature([apartment_ad_typeorm_repository_1.ApartmentAdTypeormRepository])],
        controllers: [apartment_ad_admin_controller_1.ApartmentAdAdminController],
        providers: [apartment_ad_admin_service_1.ApartmentAdAdminService],
    })
], ApartmentAdAdminModule);
exports.ApartmentAdAdminModule = ApartmentAdAdminModule;
//# sourceMappingURL=apartment-ad-admin.module.js.map