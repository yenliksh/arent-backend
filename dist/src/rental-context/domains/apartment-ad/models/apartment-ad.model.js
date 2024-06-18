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
var ApartmentAdModel_1, ApartmentAdViewModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdViewModel = exports.ApartmentAdModel = exports.BaseApartmentAdModel = void 0;
const contract_request_model_1 = require("../../contract-request/models/contract-request.model");
const apartment_ad_orm_entity_1 = require("../../../../infrastructure/database/entities/apartment-ad.orm-entity");
const field_from_resolver_decorator_1 = require("../../../../infrastructure/decorators/field-from-resolver.decorator");
const enums_1 = require("../../../../infrastructure/enums");
const apartment_ad_characteristics_model_1 = require("../../../../infrastructure/models/apartment-ad-characteristics.model");
const model_base_1 = require("../../../../libs/ddd/interface-adapters/base-classes/model.base");
const graphql_1 = require("@nestjs/graphql");
const user_model_1 = require("../../user/models/user.model");
const apartment_ad_rules_model_1 = require("../../../../infrastructure/models/apartment-ad-rules.model");
const types_1 = require("../domain/types");
const apartment_ad_long_term_rent_model_1 = require("./apartment-ad-long-term-rent.model");
const apartment_ad_short_term_rent_model_1 = require("./apartment-ad-short-term-rent.model");
const apartment_ad_address_model_1 = require("./sub-models/apartment-ad-address.model");
const apartment_ad_description_model_1 = require("./sub-models/apartment-ad-description.model");
const apartment_ad_details_model_1 = require("./sub-models/apartment-ad-details.model");
const apartment_ad_media_model_1 = require("./sub-models/apartment-ad-media.model");
let BaseApartmentAdModel = class BaseApartmentAdModel extends model_base_1.ModelBase {
    constructor(props) {
        var _a, _b;
        super(props);
        const addressProps = apartment_ad_address_model_1.ApartmentAdAddressModel.getAddressProps(props);
        const detailsProps = apartment_ad_details_model_1.ApartmentAdDetailsModel.getDetailsProps(props);
        const assignObject = {
            landlordId: props.landlordId,
            rentPeriodType: props.rentPeriodType,
            apartmentType: props.apartmentType,
            apartmentCategory: props.apartmentCategory,
            defaultPaymentMethod: props.defaultPaymentMethod,
            address: addressProps ? apartment_ad_address_model_1.ApartmentAdAddressModel.create(addressProps) : undefined,
            details: detailsProps ? apartment_ad_details_model_1.ApartmentAdDetailsModel.create(detailsProps) : undefined,
            photos: (((_a = props.media) === null || _a === void 0 ? void 0 : _a.photos) || []).map(apartment_ad_media_model_1.ApartmentAdMediaModel.create),
            videos: (((_b = props.media) === null || _b === void 0 ? void 0 : _b.videos) || []).map(apartment_ad_media_model_1.ApartmentAdMediaModel.create),
            description: props.description ? apartment_ad_description_model_1.ApartmentAdDescriptionModel.create(props.description) : undefined,
            rules: props.rules ? apartment_ad_rules_model_1.ApartmentAdRulesModel.create(props.rules) : undefined,
            characteristics: props.characteristics
                ? apartment_ad_characteristics_model_1.ApartmentAdCharacteristicsModel.create(props.characteristics)
                : undefined,
        };
        Object.assign(this, assignObject);
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], BaseApartmentAdModel.prototype, "landlordId", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.RentPeriodType),
    __metadata("design:type", String)
], BaseApartmentAdModel.prototype, "rentPeriodType", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.ApartmentType),
    __metadata("design:type", String)
], BaseApartmentAdModel.prototype, "apartmentType", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.ApartmentCategory),
    __metadata("design:type", String)
], BaseApartmentAdModel.prototype, "apartmentCategory", void 0);
__decorate([
    (0, graphql_1.Field)(() => apartment_ad_details_model_1.ApartmentAdDetailsModel, { nullable: true }),
    __metadata("design:type", apartment_ad_details_model_1.ApartmentAdDetailsModel)
], BaseApartmentAdModel.prototype, "details", void 0);
__decorate([
    (0, graphql_1.Field)(() => apartment_ad_address_model_1.ApartmentAdAddressModel, { nullable: true }),
    __metadata("design:type", apartment_ad_address_model_1.ApartmentAdAddressModel)
], BaseApartmentAdModel.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => [apartment_ad_media_model_1.ApartmentAdMediaModel]),
    __metadata("design:type", Array)
], BaseApartmentAdModel.prototype, "photos", void 0);
__decorate([
    (0, graphql_1.Field)(() => [apartment_ad_media_model_1.ApartmentAdMediaModel]),
    __metadata("design:type", Array)
], BaseApartmentAdModel.prototype, "videos", void 0);
__decorate([
    (0, graphql_1.Field)(() => apartment_ad_description_model_1.ApartmentAdDescriptionModel, { nullable: true }),
    __metadata("design:type", apartment_ad_description_model_1.ApartmentAdDescriptionModel)
], BaseApartmentAdModel.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => apartment_ad_rules_model_1.ApartmentAdRulesModel, { nullable: true }),
    __metadata("design:type", apartment_ad_rules_model_1.ApartmentAdRulesModel)
], BaseApartmentAdModel.prototype, "rules", void 0);
__decorate([
    (0, graphql_1.Field)(() => apartment_ad_characteristics_model_1.ApartmentAdCharacteristicsModel, { nullable: true }),
    __metadata("design:type", apartment_ad_characteristics_model_1.ApartmentAdCharacteristicsModel)
], BaseApartmentAdModel.prototype, "characteristics", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.PaymentMethod, { nullable: true }),
    __metadata("design:type", String)
], BaseApartmentAdModel.prototype, "defaultPaymentMethod", void 0);
BaseApartmentAdModel = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [apartment_ad_orm_entity_1.ApartmentAdOrmEntity])
], BaseApartmentAdModel);
exports.BaseApartmentAdModel = BaseApartmentAdModel;
let ApartmentAdModel = ApartmentAdModel_1 = class ApartmentAdModel extends BaseApartmentAdModel {
    constructor(apartmentAd) {
        super(apartmentAd);
    }
    static create(props) {
        const payload = new ApartmentAdModel_1(props);
        const assignObject = {
            innopayCardId: props.innopayCardId,
            completeStep: props.completeStep,
            landlord: props.landlord ? user_model_1.UserMeModel.create(props.landlord) : undefined,
            longTermRent: props.longTermRent ? apartment_ad_long_term_rent_model_1.ApartmentAdLongTermRentModel.create(props.longTermRent) : undefined,
            shortTermRent: props.shortTermRent ? apartment_ad_short_term_rent_model_1.ApartmentAdShortTermRentModel.create(props.shortTermRent) : undefined,
            adDescription: props.description ? apartment_ad_description_model_1.ApartmentAdDescriptionModel.create(props.description) : undefined,
            adCharacteristics: props.characteristics
                ? apartment_ad_characteristics_model_1.ApartmentAdCharacteristicsModel.create(props.characteristics)
                : undefined,
        };
        Object.assign(payload, assignObject);
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ApartmentAdModel.prototype, "innopayCardId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ApartmentAdModel.prototype, "completeStep", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => user_model_1.UserMeModel),
    __metadata("design:type", user_model_1.UserMeModel)
], ApartmentAdModel.prototype, "landlord", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => apartment_ad_long_term_rent_model_1.ApartmentAdLongTermRentModel, { nullable: true }),
    __metadata("design:type", apartment_ad_long_term_rent_model_1.ApartmentAdLongTermRentModel)
], ApartmentAdModel.prototype, "longTermRent", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => apartment_ad_short_term_rent_model_1.ApartmentAdShortTermRentModel, { nullable: true }),
    __metadata("design:type", apartment_ad_short_term_rent_model_1.ApartmentAdShortTermRentModel)
], ApartmentAdModel.prototype, "shortTermRent", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => apartment_ad_description_model_1.ApartmentAdDescriptionModel, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdModel.prototype, "adDescription", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => apartment_ad_characteristics_model_1.ApartmentAdCharacteristicsModel, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdModel.prototype, "adCharacteristics", void 0);
ApartmentAdModel = ApartmentAdModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [apartment_ad_orm_entity_1.ApartmentAdOrmEntity])
], ApartmentAdModel);
exports.ApartmentAdModel = ApartmentAdModel;
let ApartmentAdViewModel = ApartmentAdViewModel_1 = class ApartmentAdViewModel extends BaseApartmentAdModel {
    constructor(apartmentAd) {
        super(apartmentAd);
    }
    static create(props) {
        var _a;
        const payload = new ApartmentAdViewModel_1(props);
        const assignObject = {
            landlord: props.landlord ? user_model_1.UserModel.create(props.landlord) : undefined,
            longTermRent: props.longTermRent ? apartment_ad_long_term_rent_model_1.ApartmentAdLongTermRentViewModel.create(props.longTermRent) : undefined,
            shortTermRent: props.shortTermRent ? apartment_ad_short_term_rent_model_1.ApartmentAdShortTermRentViewModel.create(props.shortTermRent) : undefined,
            contractRequests: ((_a = props.contractRequests) === null || _a === void 0 ? void 0 : _a.length)
                ? props.contractRequests.map((i) => contract_request_model_1.ContractRequestModel.create(i))
                : undefined,
        };
        Object.assign(payload, assignObject);
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => [contract_request_model_1.ContractRequestModel], { nullable: true }),
    __metadata("design:type", Array)
], ApartmentAdViewModel.prototype, "contractRequests", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => user_model_1.UserModel),
    __metadata("design:type", user_model_1.UserModel)
], ApartmentAdViewModel.prototype, "landlord", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => apartment_ad_long_term_rent_model_1.ApartmentAdLongTermRentViewModel, { nullable: true }),
    __metadata("design:type", apartment_ad_long_term_rent_model_1.ApartmentAdLongTermRentViewModel)
], ApartmentAdViewModel.prototype, "longTermRent", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => apartment_ad_short_term_rent_model_1.ApartmentAdShortTermRentViewModel, { nullable: true }),
    __metadata("design:type", apartment_ad_short_term_rent_model_1.ApartmentAdShortTermRentViewModel)
], ApartmentAdViewModel.prototype, "shortTermRent", void 0);
ApartmentAdViewModel = ApartmentAdViewModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [apartment_ad_orm_entity_1.ApartmentAdOrmEntity])
], ApartmentAdViewModel);
exports.ApartmentAdViewModel = ApartmentAdViewModel;
//# sourceMappingURL=apartment-ad.model.js.map