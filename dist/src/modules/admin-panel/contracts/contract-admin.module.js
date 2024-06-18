"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractAdminModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const contracts_admin_controller_1 = require("./contracts-admin.controller");
const contracts_admin_service_1 = require("./contracts-admin.service");
const contracts_repository_1 = require("./repositories/contracts.repository");
let ContractAdminModule = class ContractAdminModule {
};
ContractAdminModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, typeorm_1.TypeOrmModule.forFeature([contracts_repository_1.ContractsTypeormRepository])],
        controllers: [contracts_admin_controller_1.ContractsAdminController],
        providers: [contracts_admin_service_1.ContractsAdminService],
    })
], ContractAdminModule);
exports.ContractAdminModule = ContractAdminModule;
//# sourceMappingURL=contract-admin.module.js.map