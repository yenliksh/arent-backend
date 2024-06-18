"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopayCardByContractIdOrmEntityLoader = void 0;
const contract_orm_entity_1 = require("../../../../infrastructure/database/entities/contract.orm-entity");
const common_1 = require("@nestjs/common");
const DataLoader = require("dataloader");
let InnopayCardByContractIdOrmEntityLoader = class InnopayCardByContractIdOrmEntityLoader {
    generateDataLoader() {
        return new DataLoader(async (contractIds) => {
            const contractSubQuery = contract_orm_entity_1.ContractOrmEntity.query().findByIds(contractIds);
            const innopayCards = await contract_orm_entity_1.ContractOrmEntity.relatedQuery('tenantInnopayCard')
                .for(contractSubQuery)
                .withGraphFetched({ contracts: true })
                .modifyGraph('contracts', (builder) => {
                builder.select('id').whereIn('id', contractIds);
            });
            return contractIds.map((id) => innopayCards.find((innopayCard) => { var _a; return (_a = innopayCard.contracts) === null || _a === void 0 ? void 0 : _a.some((contract) => contract.id === id); }));
        });
    }
};
InnopayCardByContractIdOrmEntityLoader = __decorate([
    (0, common_1.Injectable)()
], InnopayCardByContractIdOrmEntityLoader);
exports.InnopayCardByContractIdOrmEntityLoader = InnopayCardByContractIdOrmEntityLoader;
//# sourceMappingURL=innopay-card-by-contract-id.dataloader.js.map