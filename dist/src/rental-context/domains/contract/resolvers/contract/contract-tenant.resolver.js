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
exports.ContractTenantResolver = void 0;
const apartment_ad_model_1 = require("../../../apartment-ad/models/apartment-ad.model");
const contract_model_1 = require("../../models/contract.model");
const contract_cancelation_model_1 = require("../../models/sub-models/contract-cancelation.model");
const next_payment_info_model_1 = require("../../models/sub-models/next-payment-info.model");
const innopay_card_model_1 = require("../../../innopay-card/models/innopay-card.model");
const user_model_1 = require("../../../user/models/user.model");
const apartment_ad_dataloader_1 = require("../../../../../infrastructure/dataloader/apartment-ad.dataloader");
const contract_cancelation_dataloader_1 = require("../../../../../infrastructure/dataloader/contract-cancelation.dataloader");
const innopay_card_dataloader_1 = require("../../../../../infrastructure/dataloader/innopay-card.dataloader");
const payment_transaction_dataloader_1 = require("../../../../../infrastructure/dataloader/payment-transaction.dataloader");
const user_dataloader_1 = require("../../../../../infrastructure/dataloader/user.dataloader");
const dataloader_1 = require("../../../../../libs/dataloader");
const graphql_1 = require("@nestjs/graphql");
const dataloader_2 = require("dataloader");
let ContractTenantResolver = class ContractTenantResolver {
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
        return user_model_1.UserMeModel.create(result);
    }
    async innopayCard(contract, innopayCardOrmEntityLoader) {
        const { innopayCard, innopayCardId } = contract;
        if (!innopayCardId) {
            return null;
        }
        if (innopayCard) {
            return innopayCard;
        }
        const result = await innopayCardOrmEntityLoader.load(innopayCardId);
        return innopay_card_model_1.InnopayCardModel.create(result);
    }
    async nextPayment(contract, paymentTransactionOrmEntityLoader) {
        const { nextPayment, nextPaymentTransactionId } = contract;
        if (!nextPaymentTransactionId) {
            return null;
        }
        if (nextPayment) {
            return nextPayment;
        }
        const result = await paymentTransactionOrmEntityLoader.load(nextPaymentTransactionId);
        return next_payment_info_model_1.NextPaymentInfoModel.create(result);
    }
    async contractCancelation(contract, contractCancelationOrmEntityLoader) {
        const { id, contractCancelation } = contract;
        if (contractCancelation) {
            return contractCancelation;
        }
        const result = await contractCancelationOrmEntityLoader.load(id);
        if (!result) {
            return null;
        }
        return contract_cancelation_model_1.ContractCancelationModel.create(result);
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => apartment_ad_model_1.ApartmentAdViewModel, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(apartment_ad_dataloader_1.ApartmentAdOrmEntityLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contract_model_1.ContractTenantModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ContractTenantResolver.prototype, "apartmentAd", null);
__decorate([
    (0, graphql_1.ResolveField)(() => user_model_1.UserModel, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(user_dataloader_1.UserOrmEntityLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contract_model_1.ContractTenantModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ContractTenantResolver.prototype, "landlord", null);
__decorate([
    (0, graphql_1.ResolveField)(() => user_model_1.UserMeModel, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(user_dataloader_1.UserOrmEntityLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contract_model_1.ContractTenantModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ContractTenantResolver.prototype, "tenant", null);
__decorate([
    (0, graphql_1.ResolveField)(() => innopay_card_model_1.InnopayCardModel, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(innopay_card_dataloader_1.InnopayCardOrmEntityLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contract_model_1.ContractTenantModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ContractTenantResolver.prototype, "innopayCard", null);
__decorate([
    (0, graphql_1.ResolveField)(() => next_payment_info_model_1.NextPaymentInfoModel, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(payment_transaction_dataloader_1.PaymentTransactionOrmEntityLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contract_model_1.ContractTenantModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ContractTenantResolver.prototype, "nextPayment", null);
__decorate([
    (0, graphql_1.ResolveField)(() => contract_cancelation_model_1.ContractCancelationModel, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, dataloader_1.Loader)(contract_cancelation_dataloader_1.ContractCancelationOrmEntityLoader.name)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contract_model_1.ContractTenantModel,
        dataloader_2.default]),
    __metadata("design:returntype", Promise)
], ContractTenantResolver.prototype, "contractCancelation", null);
ContractTenantResolver = __decorate([
    (0, graphql_1.Resolver)(() => contract_model_1.ContractTenantModel)
], ContractTenantResolver);
exports.ContractTenantResolver = ContractTenantResolver;
//# sourceMappingURL=contract-tenant.resolver.js.map