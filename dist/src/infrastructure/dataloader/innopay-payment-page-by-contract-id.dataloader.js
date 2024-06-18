"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopayPaymentPageByContractIdLoader = void 0;
const contract_orm_entity_1 = require("../database/entities/contract.orm-entity");
const common_1 = require("@nestjs/common");
const DataLoader = require("dataloader");
let InnopayPaymentPageByContractIdLoader = class InnopayPaymentPageByContractIdLoader {
    generateDataLoader() {
        return new DataLoader(async (contractIds) => {
            const isPaymentPageDataValid = (obj) => {
                return ((obj === null || obj === void 0 ? void 0 : obj.startAt) !== undefined && (obj === null || obj === void 0 ? void 0 : obj.url) !== undefined);
            };
            const contracts = await contract_orm_entity_1.ContractOrmEntity.query().findByIds(contractIds);
            return contractIds.map((id) => {
                const contract = contracts.find((contract) => contract.id === id);
                const innopayPaymentPageData = { url: contract === null || contract === void 0 ? void 0 : contract.paymentUrl, startAt: contract === null || contract === void 0 ? void 0 : contract.paymentUrlStartAt };
                if (!isPaymentPageDataValid(innopayPaymentPageData)) {
                    return;
                }
                return innopayPaymentPageData;
            });
        });
    }
};
InnopayPaymentPageByContractIdLoader = __decorate([
    (0, common_1.Injectable)()
], InnopayPaymentPageByContractIdLoader);
exports.InnopayPaymentPageByContractIdLoader = InnopayPaymentPageByContractIdLoader;
//# sourceMappingURL=innopay-payment-page-by-contract-id.dataloader.js.map