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
var ApartmentAdShortTermRentModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdShortTermRentViewModel = exports.ApartmentAdShortTermRentModel = exports.BaseApartmentAdShortTermRentModel = void 0;
const short_term_rent_orm_entity_1 = require("../../../../infrastructure/database/entities/short-term-rent.orm-entity");
const field_from_resolver_decorator_1 = require("../../../../infrastructure/decorators/field-from-resolver.decorator");
const enums_1 = require("../../../../infrastructure/enums");
const model_base_1 = require("../../../../libs/ddd/interface-adapters/base-classes/model.base");
const minimal_unit_helper_1 = require("../../../../libs/utils/minimal-unit.helper");
const graphql_1 = require("@nestjs/graphql");
const types_1 = require("../domain/types");
const apartment_ad_model_1 = require("./apartment-ad.model");
const apartment_ad_locked_dates_model_1 = require("./sub-models/apartment-ad-locked-dates.model");
let BaseApartmentAdShortTermRentModel = class BaseApartmentAdShortTermRentModel extends model_base_1.ModelBase {
    constructor(props) {
        super(props);
        const { cost, currency, apartmentAdId, rentBookingType, status, isApproved, declineReason, cancellationPolicy, arrivalTime, departureTime, lockedDates, bookingAccessInMonths, } = props;
        const assignObject = {
            cost: (0, minimal_unit_helper_1.toMinorUnitString)(cost),
            currency,
            apartmentAdId,
            rentBookingType,
            status,
            isApproved,
            declineReason,
            cancellationPolicy,
            arrivalTime,
            departureTime,
            bookingAccessInMonths,
            lockedDates: (lockedDates === null || lockedDates === void 0 ? void 0 : lockedDates.map((i) => apartment_ad_locked_dates_model_1.ApartmentAdLockedDatesModel.create(i))) || [],
        };
        Object.assign(this, assignObject);
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], BaseApartmentAdShortTermRentModel.prototype, "cost", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.CurrencyType, { defaultValue: types_1.CurrencyType.KZT, description: 'does not need specify in MPV' }),
    __metadata("design:type", String)
], BaseApartmentAdShortTermRentModel.prototype, "currency", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], BaseApartmentAdShortTermRentModel.prototype, "apartmentAdId", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.ShortTermRentBookingType),
    __metadata("design:type", String)
], BaseApartmentAdShortTermRentModel.prototype, "rentBookingType", void 0);
__decorate([
    (0, graphql_1.Field)(() => [types_1.ApartmentAdStatusType]),
    __metadata("design:type", Array)
], BaseApartmentAdShortTermRentModel.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], BaseApartmentAdShortTermRentModel.prototype, "isApproved", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], BaseApartmentAdShortTermRentModel.prototype, "declineReason", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.ShortTermRentCancellationPolicyType, { nullable: true }),
    __metadata("design:type", String)
], BaseApartmentAdShortTermRentModel.prototype, "cancellationPolicy", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], BaseApartmentAdShortTermRentModel.prototype, "arrivalTime", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], BaseApartmentAdShortTermRentModel.prototype, "departureTime", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], BaseApartmentAdShortTermRentModel.prototype, "bookingAccessInMonths", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => [apartment_ad_locked_dates_model_1.ApartmentAdLockedDatesModel]),
    __metadata("design:type", Array)
], BaseApartmentAdShortTermRentModel.prototype, "lockedDates", void 0);
BaseApartmentAdShortTermRentModel = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [short_term_rent_orm_entity_1.ShortTermRentOrmEntity])
], BaseApartmentAdShortTermRentModel);
exports.BaseApartmentAdShortTermRentModel = BaseApartmentAdShortTermRentModel;
let ApartmentAdShortTermRentModel = ApartmentAdShortTermRentModel_1 = class ApartmentAdShortTermRentModel extends BaseApartmentAdShortTermRentModel {
    constructor(props) {
        super(props);
    }
    static create(props) {
        const payload = new ApartmentAdShortTermRentModel_1(props);
        const assignObject = {
            apartmentAd: props.apartmentAd ? apartment_ad_model_1.ApartmentAdModel.create(props.apartmentAd) : undefined,
        };
        Object.assign(payload, assignObject);
        return payload;
    }
};
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => apartment_ad_model_1.ApartmentAdModel),
    __metadata("design:type", apartment_ad_model_1.ApartmentAdModel)
], ApartmentAdShortTermRentModel.prototype, "apartmentAd", void 0);
ApartmentAdShortTermRentModel = ApartmentAdShortTermRentModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [short_term_rent_orm_entity_1.ShortTermRentOrmEntity])
], ApartmentAdShortTermRentModel);
exports.ApartmentAdShortTermRentModel = ApartmentAdShortTermRentModel;
let ApartmentAdShortTermRentViewModel = class ApartmentAdShortTermRentViewModel extends BaseApartmentAdShortTermRentModel {
    constructor(props) {
        super(props);
    }
    static create(props) {
        const payload = new ApartmentAdShortTermRentModel(props);
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
], ApartmentAdShortTermRentViewModel.prototype, "apartmentAd", void 0);
ApartmentAdShortTermRentViewModel = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [short_term_rent_orm_entity_1.ShortTermRentOrmEntity])
], ApartmentAdShortTermRentViewModel);
exports.ApartmentAdShortTermRentViewModel = ApartmentAdShortTermRentViewModel;
//# sourceMappingURL=apartment-ad-short-term-rent.model.js.map