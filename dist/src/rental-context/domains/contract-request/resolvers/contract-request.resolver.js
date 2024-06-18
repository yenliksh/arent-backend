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
exports.ContractRequestGraphqlResolver = void 0;
const apartment_ad_model_1 = require("../../apartment-ad/models/apartment-ad.model");
const contract_model_1 = require("../../contract/models/contract.model");
const apartment_ad_dataloader_1 = require("../../../../infrastructure/dataloader/apartment-ad.dataloader");
const user_dataloader_1 = require("../../../../infrastructure/dataloader/user.dataloader");
const dataloader_1 = require("../../../../libs/dataloader");
const graphql_1 = require("@nestjs/graphql");
const dataloader_2 = require("dataloader");
const user_model_1 = require("../../user/models/user.model");
const contract_by_contract_request_id_dataloader_1 = require("../dataloader/contract-by-contract-request-id.dataloader");
const contract_request_model_1 = require("../models/contract-request.model");
let ContractRequestGraphqlResolver = class ContractRequestGraphqlResolver {
    async tenant(contractRequest, userLoader) {
        const { tenantId, tenant } = contractRequest;
        if (tenant) {
            return tenant;
        }
        const result = tenantId ? await userLoader.load(tenantId) : undefined;
        return result ? user_model_1.UserModel.create(result) : undefined;
    }
    async apartmentAd(contractRequest, apartmentAdLoader) {
        const { apartmentAdId, apartmentAd } = contractRequest;
        if (apartmentAd) {
            return apartmentAd;
        }
        const result = apartmentAdId ? await apartmentAdLoader.load(apartmentAdId) : undefined;
        return result ? apartment_ad_model_1.ApartmentAdViewModel.create(result) : undefined;
    }
    async contract(contractRequest, contractLoader) {
        const { id, contract } = contractRequest;
        if (contract) {
            return contract;
        }
        const result = await contractLoader.load(id);
        return result ? new contract_model_1.BaseContractModel(result) : undefined;
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => user_model_1.UserModel),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(user_dataloader_1.UserOrmEntityLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contract_request_model_1.ContractRequestModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ContractRequestGraphqlResolver.prototype, "tenant", null);
__decorate([
    (0, graphql_1.ResolveField)(() => apartment_ad_model_1.ApartmentAdViewModel),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(apartment_ad_dataloader_1.ApartmentAdOrmEntityLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contract_request_model_1.ContractRequestModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ContractRequestGraphqlResolver.prototype, "apartmentAd", null);
__decorate([
    (0, graphql_1.ResolveField)(() => contract_model_1.BaseContractModel),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(contract_by_contract_request_id_dataloader_1.ContractByContractRequestIdLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contract_request_model_1.ContractRequestModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ContractRequestGraphqlResolver.prototype, "contract", null);
ContractRequestGraphqlResolver = __decorate([
    (0, graphql_1.Resolver)(() => contract_request_model_1.ContractRequestModel)
], ContractRequestGraphqlResolver);
exports.ContractRequestGraphqlResolver = ContractRequestGraphqlResolver;
//# sourceMappingURL=contract-request.resolver.js.map