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
exports.FindShortTermRentAdsFilterRequest = void 0;
const enums_1 = require("../../../../infrastructure/enums");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const types_1 = require("../domain/types");
const date_range_input_1 = require("../inputs/date-range.input");
const location_input_1 = require("../inputs/location.input");
const price_range_input_1 = require("../inputs/price-range.input");
let FindShortTermRentAdsFilterRequest = class FindShortTermRentAdsFilterRequest {
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => location_input_1.LocationInput),
    (0, graphql_1.Field)(() => location_input_1.LocationInput),
    __metadata("design:type", location_input_1.LocationInput)
], FindShortTermRentAdsFilterRequest.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => price_range_input_1.PriceRangeInput),
    (0, graphql_1.Field)(() => price_range_input_1.PriceRangeInput, { nullable: true }),
    __metadata("design:type", price_range_input_1.PriceRangeInput)
], FindShortTermRentAdsFilterRequest.prototype, "priceRange", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => date_range_input_1.DateRangeInput),
    (0, graphql_1.Field)(() => date_range_input_1.DateRangeInput, { nullable: true }),
    __metadata("design:type", date_range_input_1.DateRangeInput)
], FindShortTermRentAdsFilterRequest.prototype, "dateRange", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(types_1.ApartmentType, { each: true }),
    (0, graphql_1.Field)(() => [types_1.ApartmentType], { nullable: true }),
    __metadata("design:type", Array)
], FindShortTermRentAdsFilterRequest.prototype, "apartmentTypes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(types_1.ApartmentCategory),
    (0, graphql_1.Field)(() => types_1.ApartmentCategory, { nullable: true }),
    __metadata("design:type", String)
], FindShortTermRentAdsFilterRequest.prototype, "apartmentCategory", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.ShortTermRentBookingType),
    (0, graphql_1.Field)(() => enums_1.ShortTermRentBookingType, { nullable: true }),
    __metadata("design:type", String)
], FindShortTermRentAdsFilterRequest.prototype, "rentBookingType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.ShortTermRentCancellationPolicyType),
    (0, graphql_1.Field)(() => enums_1.ShortTermRentCancellationPolicyType, { nullable: true }),
    __metadata("design:type", String)
], FindShortTermRentAdsFilterRequest.prototype, "cancellationPolicyType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(types_1.ApartmentRuleType, { each: true }),
    (0, graphql_1.Field)(() => [types_1.ApartmentRuleType], { nullable: true }),
    __metadata("design:type", Array)
], FindShortTermRentAdsFilterRequest.prototype, "rules", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0, { each: true }),
    (0, class_validator_1.Max)(8, { each: true }),
    (0, class_validator_1.IsArray)(),
    (0, graphql_1.Field)(() => [graphql_1.Int], { nullable: true, description: '0 equal studio apartment, 8 mean 8+ number of rooms' }),
    __metadata("design:type", Array)
], FindShortTermRentAdsFilterRequest.prototype, "numberOfRooms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(1000000),
    (0, class_validator_1.IsInt)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { defaultValue: 1, nullable: true }),
    __metadata("design:type", Number)
], FindShortTermRentAdsFilterRequest.prototype, "numberOfAdults", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(1000000),
    (0, class_validator_1.IsInt)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], FindShortTermRentAdsFilterRequest.prototype, "numberOfChild", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(1000000),
    (0, class_validator_1.IsInt)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], FindShortTermRentAdsFilterRequest.prototype, "numberOfPets", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMilitaryTime)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], FindShortTermRentAdsFilterRequest.prototype, "arrivalTimeStart", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMilitaryTime)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], FindShortTermRentAdsFilterRequest.prototype, "arrivalTimeEnd", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMilitaryTime)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], FindShortTermRentAdsFilterRequest.prototype, "departureTimeStart", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMilitaryTime)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], FindShortTermRentAdsFilterRequest.prototype, "departureTimeEnd", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], FindShortTermRentAdsFilterRequest.prototype, "landArea", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], FindShortTermRentAdsFilterRequest.prototype, "totalArea", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], FindShortTermRentAdsFilterRequest.prototype, "territoryArea", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], FindShortTermRentAdsFilterRequest.prototype, "objectArea", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], FindShortTermRentAdsFilterRequest.prototype, "ceilingHeight", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], FindShortTermRentAdsFilterRequest.prototype, "yearOfConstruction", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], FindShortTermRentAdsFilterRequest.prototype, "floor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], FindShortTermRentAdsFilterRequest.prototype, "waterSupply", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], FindShortTermRentAdsFilterRequest.prototype, "gasSupply", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], FindShortTermRentAdsFilterRequest.prototype, "electricitySupply", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], FindShortTermRentAdsFilterRequest.prototype, "objectPlacement", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], FindShortTermRentAdsFilterRequest.prototype, "communications", void 0);
FindShortTermRentAdsFilterRequest = __decorate([
    (0, graphql_1.InputType)()
], FindShortTermRentAdsFilterRequest);
exports.FindShortTermRentAdsFilterRequest = FindShortTermRentAdsFilterRequest;
//# sourceMappingURL=find-short-term-rent-ads-filter.request.js.map