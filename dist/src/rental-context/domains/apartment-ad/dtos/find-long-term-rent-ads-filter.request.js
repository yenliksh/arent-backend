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
exports.FindLongTermRentAdsFilterRequest = void 0;
const enums_1 = require("../../../../infrastructure/enums");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const types_1 = require("../domain/types");
const location_input_1 = require("../inputs/location.input");
const price_range_input_1 = require("../inputs/price-range.input");
let FindLongTermRentAdsFilterRequest = class FindLongTermRentAdsFilterRequest {
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => location_input_1.LocationInput),
    (0, graphql_1.Field)(() => location_input_1.LocationInput),
    __metadata("design:type", location_input_1.LocationInput)
], FindLongTermRentAdsFilterRequest.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => price_range_input_1.PriceRangeInput),
    (0, graphql_1.Field)(() => price_range_input_1.PriceRangeInput, { nullable: true }),
    __metadata("design:type", price_range_input_1.PriceRangeInput)
], FindLongTermRentAdsFilterRequest.prototype, "priceRange", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(types_1.ApartmentType, { each: true }),
    (0, graphql_1.Field)(() => [types_1.ApartmentType], { nullable: true }),
    __metadata("design:type", Array)
], FindLongTermRentAdsFilterRequest.prototype, "apartmentTypes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(types_1.ApartmentCategory),
    (0, graphql_1.Field)(() => types_1.ApartmentCategory, { nullable: true }),
    __metadata("design:type", String)
], FindLongTermRentAdsFilterRequest.prototype, "apartmentCategory", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(types_1.ApartmentRuleType, { each: true }),
    (0, graphql_1.Field)(() => [types_1.ApartmentRuleType], { nullable: true }),
    __metadata("design:type", Array)
], FindLongTermRentAdsFilterRequest.prototype, "rules", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0, { each: true }),
    (0, class_validator_1.Max)(8, { each: true }),
    (0, class_validator_1.IsArray)(),
    (0, graphql_1.Field)(() => [graphql_1.Int], { nullable: true, description: '0 equal studio apartment, 8 mean 8+ number of rooms' }),
    __metadata("design:type", Array)
], FindLongTermRentAdsFilterRequest.prototype, "numberOfRooms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(1000000),
    (0, class_validator_1.IsInt)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { defaultValue: 1, nullable: true }),
    __metadata("design:type", Number)
], FindLongTermRentAdsFilterRequest.prototype, "numberOfAdults", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(1000000),
    (0, class_validator_1.IsInt)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], FindLongTermRentAdsFilterRequest.prototype, "numberOfChild", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(1000000),
    (0, class_validator_1.IsInt)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], FindLongTermRentAdsFilterRequest.prototype, "numberOfPets", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], FindLongTermRentAdsFilterRequest.prototype, "landArea", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], FindLongTermRentAdsFilterRequest.prototype, "totalArea", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], FindLongTermRentAdsFilterRequest.prototype, "territoryArea", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], FindLongTermRentAdsFilterRequest.prototype, "objectArea", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], FindLongTermRentAdsFilterRequest.prototype, "ceilingHeight", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], FindLongTermRentAdsFilterRequest.prototype, "yearOfConstruction", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], FindLongTermRentAdsFilterRequest.prototype, "floor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], FindLongTermRentAdsFilterRequest.prototype, "waterSupply", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], FindLongTermRentAdsFilterRequest.prototype, "gasSupply", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], FindLongTermRentAdsFilterRequest.prototype, "electricitySupply", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], FindLongTermRentAdsFilterRequest.prototype, "objectPlacement", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], FindLongTermRentAdsFilterRequest.prototype, "communications", void 0);
FindLongTermRentAdsFilterRequest = __decorate([
    (0, graphql_1.InputType)()
], FindLongTermRentAdsFilterRequest);
exports.FindLongTermRentAdsFilterRequest = FindLongTermRentAdsFilterRequest;
//# sourceMappingURL=find-long-term-rent-ads-filter.request.js.map