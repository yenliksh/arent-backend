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
var ContractLandlordModel_1, ContractTenantModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractChatModel = exports.ContractTenantModel = exports.ContractLandlordModel = exports.BaseContractModel = void 0;
const apartment_ad_model_1 = require("../../apartment-ad/models/apartment-ad.model");
const apartment_guests_model_1 = require("../../contract-request/models/sub-models/apartment-guests.model");
const innopay_card_model_1 = require("../../innopay-card/models/innopay-card.model");
const user_model_1 = require("../../user/models/user.model");
const contract_orm_entity_1 = require("../../../../infrastructure/database/entities/contract.orm-entity");
const field_from_resolver_decorator_1 = require("../../../../infrastructure/decorators/field-from-resolver.decorator");
const enums_1 = require("../../../../infrastructure/enums");
const model_base_1 = require("../../../../libs/ddd/interface-adapters/base-classes/model.base");
const minimal_unit_helper_1 = require("../../../../libs/utils/minimal-unit.helper");
const graphql_1 = require("@nestjs/graphql");
const types_1 = require("../../apartment-ad/domain/types");
const base_contract_apartment_ad_data_model_1 = require("./sub-models/base-contract-apartment-ad-data.model");
const contract_cancelation_model_1 = require("./sub-models/contract-cancelation.model");
const contract_rules_model_1 = require("./sub-models/contract-rules.model");
const innopay_payment_page_model_1 = require("./sub-models/innopay-payment-page.model");
const next_payment_info_model_1 = require("./sub-models/next-payment-info.model");
let BaseContractModel = class BaseContractModel extends model_base_1.ModelBase {
    constructor(props) {
        var _a, _b;
        super(props);
        const assignObject = {
            apartmentRentPeriodType: props.apartmentRentPeriodType,
            contractRequestId: props.contractRequestId,
            status: props.status,
            apartmentAdId: props.apartmentAdId,
            arrivalDate: (_a = props.arrivalDate) === null || _a === void 0 ? void 0 : _a.toISOString(),
            cost: (0, minimal_unit_helper_1.toMinorUnitString)(props.cost),
            currency: props.currency,
            departureDate: (_b = props.departureDate) === null || _b === void 0 ? void 0 : _b.toISOString(),
            landlordId: props.landlordId,
            rules: props.rules ? contract_rules_model_1.ContractRulesModel.create(props.rules) : undefined,
            tenantId: props.tenantId,
            shortTermRentCancellationPolicyType: props.shortTermCancellationPolicy,
            longTermRentCancellationPolicyType: props.longTermCancellationPolicy,
            isPending: props.isPending,
            isTemporary: props.isTemporary,
            guests: apartment_guests_model_1.ApartmentGuestsModel.create(props.guests),
            baseApartmentAdData: base_contract_apartment_ad_data_model_1.BaseContractApartmentAdDataModel.create(props.baseApartmentAdData),
        };
        Object.assign(this, assignObject);
    }
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], BaseContractModel.prototype, "contractRequestId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], BaseContractModel.prototype, "tenantId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], BaseContractModel.prototype, "landlordId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], BaseContractModel.prototype, "apartmentAdId", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.ApartmentRentPeriodType),
    __metadata("design:type", String)
], BaseContractModel.prototype, "apartmentRentPeriodType", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], BaseContractModel.prototype, "cost", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.CurrencyType),
    __metadata("design:type", String)
], BaseContractModel.prototype, "currency", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.ContractStatus),
    __metadata("design:type", String)
], BaseContractModel.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], BaseContractModel.prototype, "arrivalDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], BaseContractModel.prototype, "departureDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => contract_rules_model_1.ContractRulesModel, { nullable: true }),
    __metadata("design:type", contract_rules_model_1.ContractRulesModel)
], BaseContractModel.prototype, "rules", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.ShortTermRentCancellationPolicyType, { nullable: true }),
    __metadata("design:type", String)
], BaseContractModel.prototype, "shortTermRentCancellationPolicyType", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.LongTermRentCancellationPolicyType, { nullable: true }),
    __metadata("design:type", String)
], BaseContractModel.prototype, "longTermRentCancellationPolicyType", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], BaseContractModel.prototype, "isPending", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], BaseContractModel.prototype, "isTemporary", void 0);
__decorate([
    (0, graphql_1.Field)(() => apartment_guests_model_1.ApartmentGuestsModel),
    __metadata("design:type", apartment_guests_model_1.ApartmentGuestsModel)
], BaseContractModel.prototype, "guests", void 0);
__decorate([
    (0, graphql_1.Field)(() => base_contract_apartment_ad_data_model_1.BaseContractApartmentAdDataModel),
    __metadata("design:type", base_contract_apartment_ad_data_model_1.BaseContractApartmentAdDataModel)
], BaseContractModel.prototype, "baseApartmentAdData", void 0);
BaseContractModel = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [contract_orm_entity_1.ContractOrmEntity])
], BaseContractModel);
exports.BaseContractModel = BaseContractModel;
let ContractLandlordModel = ContractLandlordModel_1 = class ContractLandlordModel extends BaseContractModel {
    constructor(contract) {
        super(contract);
    }
    static create(props) {
        const payload = new ContractLandlordModel_1(props);
        const assignObject = {
            apartmentAd: props.apartmentAd ? apartment_ad_model_1.ApartmentAdModel.create(props.apartmentAd) : undefined,
            nextPaymentTransactionId: props.nextPaymentTransactionId,
        };
        Object.assign(payload, assignObject);
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContractLandlordModel.prototype, "nextPaymentTransactionId", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => apartment_ad_model_1.ApartmentAdModel, { nullable: true }),
    __metadata("design:type", apartment_ad_model_1.ApartmentAdModel)
], ContractLandlordModel.prototype, "apartmentAd", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => user_model_1.UserMeModel, { nullable: true }),
    __metadata("design:type", user_model_1.UserMeModel)
], ContractLandlordModel.prototype, "landlord", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => user_model_1.UserModel, { nullable: true }),
    __metadata("design:type", user_model_1.UserModel)
], ContractLandlordModel.prototype, "tenant", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => next_payment_info_model_1.NextPaymentInfoModel, { nullable: true }),
    __metadata("design:type", next_payment_info_model_1.NextPaymentInfoModel)
], ContractLandlordModel.prototype, "nextPayment", void 0);
ContractLandlordModel = ContractLandlordModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [contract_orm_entity_1.ContractOrmEntity])
], ContractLandlordModel);
exports.ContractLandlordModel = ContractLandlordModel;
let ContractTenantModel = ContractTenantModel_1 = class ContractTenantModel extends BaseContractModel {
    constructor(contract) {
        super(contract);
    }
    static create(props) {
        var _a;
        const payload = new ContractTenantModel_1(props);
        const assignObject = {
            innopayCardId: (_a = props.tenantInnopayCardId) !== null && _a !== void 0 ? _a : undefined,
            apartmentAd: props.apartmentAd ? apartment_ad_model_1.ApartmentAdViewModel.create(props.apartmentAd) : undefined,
            tenant: props.tenant ? user_model_1.UserMeModel.create(props.tenant) : undefined,
            innopayCard: props.tenantInnopayCard ? innopay_card_model_1.InnopayCardModel.create(props.tenantInnopayCard) : undefined,
            nextPaymentTransactionId: props.nextPaymentTransactionId,
        };
        Object.assign(payload, assignObject);
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContractTenantModel.prototype, "innopayCardId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContractTenantModel.prototype, "nextPaymentTransactionId", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => apartment_ad_model_1.ApartmentAdViewModel, { nullable: true }),
    __metadata("design:type", apartment_ad_model_1.ApartmentAdViewModel)
], ContractTenantModel.prototype, "apartmentAd", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => user_model_1.UserModel, { nullable: true }),
    __metadata("design:type", user_model_1.UserModel)
], ContractTenantModel.prototype, "landlord", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => user_model_1.UserMeModel, { nullable: true }),
    __metadata("design:type", user_model_1.UserMeModel)
], ContractTenantModel.prototype, "tenant", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => innopay_card_model_1.InnopayCardModel, { nullable: true }),
    __metadata("design:type", innopay_card_model_1.InnopayCardModel)
], ContractTenantModel.prototype, "innopayCard", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => next_payment_info_model_1.NextPaymentInfoModel, { nullable: true }),
    __metadata("design:type", next_payment_info_model_1.NextPaymentInfoModel)
], ContractTenantModel.prototype, "nextPayment", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => contract_cancelation_model_1.ContractCancelationModel, { nullable: true }),
    __metadata("design:type", contract_cancelation_model_1.ContractCancelationModel)
], ContractTenantModel.prototype, "contractCancelation", void 0);
ContractTenantModel = ContractTenantModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [contract_orm_entity_1.ContractOrmEntity])
], ContractTenantModel);
exports.ContractTenantModel = ContractTenantModel;
let ContractChatModel = class ContractChatModel extends BaseContractModel {
    constructor(contract) {
        super(contract);
    }
    static create(props) {
        const payload = new ContractTenantModel(props);
        const assignObject = {
            apartmentAd: props.apartmentAd ? apartment_ad_model_1.ApartmentAdViewModel.create(props.apartmentAd) : undefined,
        };
        Object.assign(payload, assignObject);
        return payload;
    }
};
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => apartment_ad_model_1.ApartmentAdViewModel, { nullable: true }),
    __metadata("design:type", apartment_ad_model_1.ApartmentAdViewModel)
], ContractChatModel.prototype, "apartmentAd", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => user_model_1.UserModel, { nullable: true }),
    __metadata("design:type", user_model_1.UserModel)
], ContractChatModel.prototype, "landlord", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => user_model_1.UserModel, { nullable: true }),
    __metadata("design:type", user_model_1.UserModel)
], ContractChatModel.prototype, "tenant", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => innopay_payment_page_model_1.InnopayPaymentPageModel, { nullable: true, description: 'for tenant only' }),
    __metadata("design:type", innopay_payment_page_model_1.InnopayPaymentPageModel)
], ContractChatModel.prototype, "innopayPaymentPageModel", void 0);
ContractChatModel = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [contract_orm_entity_1.ContractOrmEntity])
], ContractChatModel);
exports.ContractChatModel = ContractChatModel;
//# sourceMappingURL=contract.model.js.map