"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractOrmEntityLoader = void 0;
const contract_orm_entity_1 = require("../database/entities/contract.orm-entity");
const common_1 = require("@nestjs/common");
const DataLoader = require("dataloader");
let ContractOrmEntityLoader = class ContractOrmEntityLoader {
    generateDataLoader() {
        return new DataLoader(async (contractIds) => {
            const contract = await contract_orm_entity_1.ContractOrmEntity.query().findByIds(contractIds);
            return contractIds.map((id) => contract.find((contract) => contract.id === id));
        });
    }
};
ContractOrmEntityLoader = __decorate([
    (0, common_1.Injectable)()
], ContractOrmEntityLoader);
exports.ContractOrmEntityLoader = ContractOrmEntityLoader;
//# sourceMappingURL=contract.dataloader.js.map