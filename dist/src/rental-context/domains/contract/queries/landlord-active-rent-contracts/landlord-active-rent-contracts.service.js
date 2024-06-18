"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandlordActiveRentContractsService = void 0;
const contract_orm_entity_1 = require("../../../../../infrastructure/database/entities/contract.orm-entity");
const enums_1 = require("../../../../../infrastructure/enums");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let LandlordActiveRentContractsService = class LandlordActiveRentContractsService {
    async handle(userId) {
        const activeRentContracts = await this.findActiveRentContracts(userId);
        return (0, oxide_ts_1.Ok)(activeRentContracts);
    }
    findActiveRentContracts(userId) {
        const activeRentContracts = contract_orm_entity_1.ContractOrmEntity.query()
            .where(`${contract_orm_entity_1.ContractOrmEntity.tableName}.status`, enums_1.ContractStatus.CONCLUDED)
            .where(`${contract_orm_entity_1.ContractOrmEntity.tableName}.isTemporary`, false)
            .where('landlordId', userId);
        return activeRentContracts;
    }
};
LandlordActiveRentContractsService = __decorate([
    (0, common_1.Injectable)()
], LandlordActiveRentContractsService);
exports.LandlordActiveRentContractsService = LandlordActiveRentContractsService;
//# sourceMappingURL=landlord-active-rent-contracts.service.js.map