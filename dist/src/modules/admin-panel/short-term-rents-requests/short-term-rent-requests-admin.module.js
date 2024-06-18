"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortTermRentRequestsAdminModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const short_term_rent_requests_typeorm_repository_1 = require("./repositories/short-term-rent-requests.typeorm-repository");
const short_term_rent_requests_admin_controller_1 = require("./short-term-rent-requests-admin.controller");
const short_term_rent_requests_admin_service_1 = require("./short-term-rent-requests-admin.service");
let ShortTermRentRequestsAdminModule = class ShortTermRentRequestsAdminModule {
};
ShortTermRentRequestsAdminModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, typeorm_1.TypeOrmModule.forFeature([short_term_rent_requests_typeorm_repository_1.ShortTermRentRequestsTypeormRepository])],
        controllers: [short_term_rent_requests_admin_controller_1.ShortTermRentRequestsAdminController],
        providers: [short_term_rent_requests_admin_service_1.ShortTermRentRequestsAdminService],
    })
], ShortTermRentRequestsAdminModule);
exports.ShortTermRentRequestsAdminModule = ShortTermRentRequestsAdminModule;
//# sourceMappingURL=short-term-rent-requests-admin.module.js.map