"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentIdentificatorModule = void 0;
const apartment_ad_identificator_typeorm_repository_1 = require("../../admin-panel/apartment-ad-identificator/repositories/apartment-ad-identificator.typeorm-repository");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const apartment_identificator_controller_1 = require("./apartment-identificator.controller");
const apartment_identificator_service_1 = require("./apartment-identificator.service");
let ApartmentIdentificatorModule = class ApartmentIdentificatorModule {
};
ApartmentIdentificatorModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, typeorm_1.TypeOrmModule.forFeature([apartment_ad_identificator_typeorm_repository_1.ApartmentAdIdentificatorTypeormRepository])],
        controllers: [apartment_identificator_controller_1.ApartmentIdentificatorController],
        providers: [apartment_identificator_service_1.ApartmentIdentificatorService],
    })
], ApartmentIdentificatorModule);
exports.ApartmentIdentificatorModule = ApartmentIdentificatorModule;
//# sourceMappingURL=apartment-identificator.module.js.map