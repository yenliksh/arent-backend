"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTransactionResolver = void 0;
const contract_model_1 = require("../../../contract/models/contract.model");
const contract_dataloader_1 = require("../../../../../infrastructure/dataloader/contract.dataloader");
const dataloader_1 = require("../../../../../libs/dataloader");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const dataloader_2 = require("dataloader");
const payment_transaction_model_1 = require("../../models/payment-transaction.model");
let PaymentTransactionResolver = class PaymentTransactionResolver {
    async contract(paymentTransaction, apartmentAdOrmEntityLoader) {
        const { contract, contractId } = paymentTransaction;
        if (contract) {
            return contract;
        }
        const result = await apartmentAdOrmEntityLoader.load(contractId);
        if (!result) {
            throw new common_1.NotFoundException('Contract not found');
        }
        return new contract_model_1.BaseContractModel(result);
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => contract_model_1.BaseContractModel),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(contract_dataloader_1.ContractOrmEntityLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_transaction_model_1.PaymentTransactionModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], PaymentTransactionResolver.prototype, "contract", null);
PaymentTransactionResolver = __decorate([
    (0, graphql_1.Resolver)(() => payment_transaction_model_1.PaymentTransactionModel)
], PaymentTransactionResolver);
exports.PaymentTransactionResolver = PaymentTransactionResolver;
//# sourceMappingURL=payment-transaction.resolver.js.map