"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongTermRentAdminModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const long_term_rent_admin_controller_1 = require("./long-term-rent-admin.controller");
const long_term_rent_admin_service_1 = require("./long-term-rent-admin.service");
const long_term_rent_typeorm_repository_1 = require("./repositories/long-term-rent.typeorm-repository");
let LongTermRentAdminModule = class LongTermRentAdminModule {
};
LongTermRentAdminModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, typeorm_1.TypeOrmModule.forFeature([long_term_rent_typeorm_repository_1.LongTermRentTypeormRepository])],
        controllers: [long_term_rent_admin_controller_1.LongTermRentAdminController],
        providers: [long_term_rent_admin_service_1.LongTermRentAdminService],
    })
], LongTermRentAdminModule);
exports.LongTermRentAdminModule = LongTermRentAdminModule;
//# sourceMappingURL=long-term-rent-admin.module.js.map