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
var ApartmentAdLongTermRentModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdLongTermRentViewModel = exports.ApartmentAdLongTermRentModel = exports.BaseApartmentAdLongTermRentModel = void 0;
const long_term_rent_orm_entity_1 = require("../../../../infrastructure/database/entities/long-term-rent.orm-entity");
const field_from_resolver_decorator_1 = require("../../../../infrastructure/decorators/field-from-resolver.decorator");
const enums_1 = require("../../../../infrastructure/enums");
const model_base_1 = require("../../../../libs/ddd/interface-adapters/base-classes/model.base");
const file_key_helper_1 = require("../../../../libs/utils/file-key.helper");
const get_cf_signed_url_1 = require("../../../../libs/utils/get-cf-signed-url");
const minimal_unit_helper_1 = require("../../../../libs/utils/minimal-unit.helper");
const graphql_1 = require("@nestjs/graphql");
const types_1 = require("../domain/types");
const apartment_ad_model_1 = require("./apartment-ad.model");
let BaseApartmentAdLongTermRentModel = class BaseApartmentAdLongTermRentModel extends model_base_1.ModelBase {
    constructor(props) {
        super(props);
        const { cost, currency, cancellationPolicy, status, apartmentAdId, isApproved, declineReason } = props;
        const assignObject = {
            cost: (0, minimal_unit_helper_1.toMinorUnitString)(cost),
            currency,
            cancellationPolicy,
            apartmentAdId,
            status,
            isApproved,
            declineReason,
        };
        Object.assign(this, assignObject);
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], BaseApartmentAdLongTermRentModel.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], BaseApartmentAdLongTermRentModel.prototype, "cost", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.CurrencyType, { defaultValue: types_1.CurrencyType.KZT, description: 'does not need specify in MPV' }),
    __metadata("design:type", String)
], BaseApartmentAdLongTermRentModel.prototype, "currency", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.LongTermRentCancellationPolicyType, { nullable: true }),
    __metadata("design:type", String)
], BaseApartmentAdLongTermRentModel.prototype, "cancellationPolicy", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], BaseApartmentAdLongTermRentModel.prototype, "apartmentAdId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [types_1.ApartmentAdStatusType]),
    __metadata("design:type", Array)
], BaseApartmentAdLongTermRentModel.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], BaseApartmentAdLongTermRentModel.prototype, "isApproved", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], BaseApartmentAdLongTermRentModel.prototype, "declineReason", void 0);
BaseApartmentAdLongTermRentModel = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [long_term_rent_orm_entity_1.LongTermRentOrmEntity])
], BaseApartmentAdLongTermRentModel);
exports.BaseApartmentAdLongTermRentModel = BaseApartmentAdLongTermRentModel;
let ApartmentAdLongTermRentModel = ApartmentAdLongTermRentModel_1 = class ApartmentAdLongTermRentModel extends BaseApartmentAdLongTermRentModel {
    constructor(props) {
        super(props);
    }
    static create(props) {
        var _a;
        const payload = new ApartmentAdLongTermRentModel_1(props);
        const assignObject = {
            ownershipDocuments: (_a = props.ownershipDocuments) === null || _a === void 0 ? void 0 : _a.map((i) => (0, get_cf_signed_url_1.getCfSignedUrl)((0, file_key_helper_1.prependDomainUrlToFileKey)(i, 'private'))),
            apartmentAd: props.apartmentAd ? apartment_ad_model_1.ApartmentAdModel.create(props.apartmentAd) : undefined,
        };
        Object.assign(payload, assignObject);
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], ApartmentAdLongTermRentModel.prototype, "ownershipDocuments", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => apartment_ad_model_1.ApartmentAdModel),
    __metadata("design:type", apartment_ad_model_1.ApartmentAdModel)
], ApartmentAdLongTermRentModel.prototype, "apartmentAd", void 0);
ApartmentAdLongTermRentModel = ApartmentAdLongTermRentModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [long_term_rent_orm_entity_1.LongTermRentOrmEntity])
], ApartmentAdLongTermRentModel);
exports.ApartmentAdLongTermRentModel = ApartmentAdLongTermRentModel;
let ApartmentAdLongTermRentViewModel = class ApartmentAdLongTermRentViewModel extends BaseApartmentAdLongTermRentModel {
    constructor(props) {
        super(props);
    }
    static create(props) {
        const payload = new ApartmentAdLongTermRentModel(props);
        const assignObject = {
            apartmentAd: props.apartmentAd ? apartment_ad_model_1.ApartmentAdViewModel.create(props.apartmentAd) : undefined,
        };
        Object.assign(payload, assignObject);
        return payload;
    }
};
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => apartment_ad_model_1.ApartmentAdViewModel),
    __metadata("design:type", apartment_ad_model_1.ApartmentAdViewModel)
], ApartmentAdLongTermRentViewModel.prototype, "apartmentAd", void 0);
ApartmentAdLongTermRentViewModel = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [long_term_rent_orm_entity_1.LongTermRentOrmEntity])
], ApartmentAdLongTermRentViewModel);
exports.ApartmentAdLongTermRentViewModel = ApartmentAdLongTermRentViewModel;
//# sourceMappingURL=apartment-ad-long-term-rent.model.js.map