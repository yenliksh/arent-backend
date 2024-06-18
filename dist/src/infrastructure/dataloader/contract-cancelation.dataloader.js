"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractCancelationOrmEntityLoader = void 0;
const contract_cancelation_orm_entity_1 = require("../database/entities/contract-cancelation.orm-entity");
const common_1 = require("@nestjs/common");
const DataLoader = require("dataloader");
let ContractCancelationOrmEntityLoader = class ContractCancelationOrmEntityLoader {
    generateDataLoader() {
        return new DataLoader(async (contractIds) => {
            const contractCancellations = await contract_cancelation_orm_entity_1.ContractCancelationOrmEntity.query().whereIn('contractId', contractIds);
            return contractIds.map((id) => contractCancellations.find((contractCancelation) => contractCancelation.contractId === id));
        });
    }
};
ContractCancelationOrmEntityLoader = __decorate([
    (0, common_1.Injectable)()
], ContractCancelationOrmEntityLoader);
exports.ContractCancelationOrmEntityLoader = ContractCancelationOrmEntityLoader;
//# sourceMappingURL=contract-cancelation.dataloader.js.map