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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditApartmentAdRequest = void 0;
const openapi = require("@nestjs/swagger");
const minimal_unit_helper_1 = require("../../../../../libs/utils/minimal-unit.helper");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../../../constants");
const types_1 = require("../../domain/types");
let EditApartmentAdRequest = class EditApartmentAdRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, rentPeriodType: { required: true, enum: require("../../domain/types").RentPeriodType }, shortTermRentCost: { required: false, type: () => Number, minimum: constants_1.SHORT_RENT_PERIOD_MIN_COST, maximum: constants_1.SHORT_RENT_PERIOD_MAX_COST }, longTermRentCost: { required: false, type: () => Number, minimum: constants_1.LONG_RENT_PERIOD_MIN_COST, maximum: constants_1.LONG_RENT_PERIOD_MAX_COST } };
    }
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, graphql_1.Field)(() => String, { description: 'apartmentId' }),
    __metadata("design:type", String)
], EditApartmentAdRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsEnum)(types_1.RentPeriodType),
    (0, graphql_1.Field)(() => types_1.RentPeriodType),
    __metadata("design:type", String)
], EditApartmentAdRequest.prototype, "rentPeriodType", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((obj) => obj.rentPeriodType === types_1.RentPeriodType.SHORT_TERM || obj.rentPeriodType == types_1.RentPeriodType.ALL),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(constants_1.SHORT_RENT_PERIOD_MIN_COST, {
        message: `shortTermRentCost must not be less than ${constants_1.SHORT_RENT_PERIOD_MIN_COST / constants_1.MINIMAL_UNIT_FACTOR}`,
    }),
    (0, class_validator_1.Max)(constants_1.SHORT_RENT_PERIOD_MAX_COST, {
        message: `shortTermRentCost must not be greater than ${constants_1.SHORT_RENT_PERIOD_MAX_COST / constants_1.MINIMAL_UNIT_FACTOR}`,
    }),
    (0, class_transformer_1.Transform)(minimal_unit_helper_1.toSmallestUnitTransformer, { toClassOnly: true }),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Number)
], EditApartmentAdRequest.prototype, "shortTermRentCost", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((obj) => obj.rentPeriodType == types_1.RentPeriodType.LONG_TERM || obj.rentPeriodType == types_1.RentPeriodType.ALL),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(constants_1.LONG_RENT_PERIOD_MIN_COST, {
        message: `longTermRentCost must not be less than ${constants_1.LONG_RENT_PERIOD_MIN_COST / constants_1.MINIMAL_UNIT_FACTOR}`,
    }),
    (0, class_validator_1.Max)(constants_1.LONG_RENT_PERIOD_MAX_COST, {
        message: `longTermRentCost must not be less than ${constants_1.LONG_RENT_PERIOD_MAX_COST / constants_1.MINIMAL_UNIT_FACTOR}`,
    }),
    (0, class_transformer_1.Transform)(minimal_unit_helper_1.toSmallestUnitTransformer, { toClassOnly: true }),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Number)
], EditApartmentAdRequest.prototype, "longTermRentCost", void 0);
EditApartmentAdRequest = __decorate([
    (0, graphql_1.InputType)()
], EditApartmentAdRequest);
exports.EditApartmentAdRequest = EditApartmentAdRequest;
//# sourceMappingURL=edit-apartment-ad.request.dto.js.map