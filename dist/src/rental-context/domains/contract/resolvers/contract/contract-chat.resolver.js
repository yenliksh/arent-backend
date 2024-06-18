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
exports.ContractChatResolver = void 0;
const apartment_ad_model_1 = require("../../../apartment-ad/models/apartment-ad.model");
const contract_model_1 = require("../../models/contract.model");
const innopay_payment_page_model_1 = require("../../models/sub-models/innopay-payment-page.model");
const user_model_1 = require("../../../user/models/user.model");
const user_orm_entity_1 = require("../../../../../infrastructure/database/entities/user.orm-entity");
const apartment_ad_dataloader_1 = require("../../../../../infrastructure/dataloader/apartment-ad.dataloader");
const innopay_payment_page_by_contract_id_dataloader_1 = require("../../../../../infrastructure/dataloader/innopay-payment-page-by-contract-id.dataloader");
const user_dataloader_1 = require("../../../../../infrastructure/dataloader/user.dataloader");
const iam_decorator_1 = require("../../../../../infrastructure/decorators/iam.decorator");
const dataloader_1 = require("../../../../../libs/dataloader");
const graphql_1 = require("@nestjs/graphql");
const dataloader_2 = require("dataloader");
let ContractChatResolver = class ContractChatResolver {
    async apartmentAd(contract, apartmentAdOrmEntityLoader) {
        const { apartmentAdId, apartmentAd } = contract;
        if (!apartmentAdId) {
            return null;
        }
        if (apartmentAd) {
            return apartmentAd;
        }
        const result = await apartmentAdOrmEntityLoader.load(apartmentAdId);
        return apartment_ad_model_1.ApartmentAdViewModel.create(result);
    }
    async landlord(contract, userOrmEntityLoader) {
        const { landlord, landlordId } = contract;
        if (!landlordId) {
            return null;
        }
        if (landlord) {
            return landlord;
        }
        const result = await userOrmEntityLoader.load(landlordId);
        return user_model_1.UserModel.create(result);
    }
    async tenant(contract, userOrmEntityLoader) {
        const { tenant, tenantId } = contract;
        if (!tenantId) {
            return null;
        }
        if (tenant) {
            return tenant;
        }
        const result = await userOrmEntityLoader.load(tenantId);
        return user_model_1.UserModel.create(result);
    }
    async innopayPaymentPageModel(iam, contract, innopayPaymentPageLoader) {
        const { innopayPaymentPageModel, id, tenantId } = contract;
        if (!iam || tenantId !== iam.id) {
            return null;
        }
        if (innopayPaymentPageModel) {
            return innopayPaymentPageModel;
        }
        const result = await innopayPaymentPageLoader.load(id);
        return result ? innopay_payment_page_model_1.InnopayPaymentPageModel.create(result) : null;
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => apartment_ad_model_1.ApartmentAdViewModel, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(apartment_ad_dataloader_1.ApartmentAdOrmEntityLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contract_model_1.ContractChatModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ContractChatResolver.prototype, "apartmentAd", null);
__decorate([
    (0, graphql_1.ResolveField)(() => user_model_1.UserModel, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(user_dataloader_1.UserOrmEntityLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contract_model_1.ContractChatModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ContractChatResolver.prototype, "landlord", null);
__decorate([
    (0, graphql_1.ResolveField)(() => user_model_1.UserModel, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(user_dataloader_1.UserOrmEntityLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contract_model_1.ContractChatModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ContractChatResolver.prototype, "tenant", null);
__decorate([
    (0, graphql_1.ResolveField)(() => innopay_payment_page_model_1.InnopayPaymentPageModel, { nullable: true }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Parent)()),
    __param(2, (0, dataloader_1.Loader)(innopay_payment_page_by_contract_id_dataloader_1.InnopayPaymentPageByContractIdLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity,
        contract_model_1.ContractChatModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ContractChatResolver.prototype, "innopayPaymentPageModel", null);
ContractChatResolver = __decorate([
    (0, graphql_1.Resolver)(() => contract_model_1.ContractChatModel)
], ContractChatResolver);
exports.ContractChatResolver = ContractChatResolver;
//# sourceMappingURL=contract-chat.resolver.js.map