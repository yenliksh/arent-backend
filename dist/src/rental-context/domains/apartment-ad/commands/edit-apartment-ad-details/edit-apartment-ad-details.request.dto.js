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
exports.EditApartmentAdDetailsRequest = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let EditApartmentAdDetailsRequest = class EditApartmentAdDetailsRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, numberOfRooms: { required: true, type: () => Number, minimum: 0, maximum: 8 }, numberOfGuests: { required: true, type: () => Number, minimum: 0, maximum: 1000000 }, name: { required: true, type: () => String, nullable: true }, totalArea: { required: true, type: () => Number, nullable: true, minimum: 0, maximum: 1000000 }, landArea: { required: true, type: () => Number, nullable: true, minimum: 0, maximum: 1000000 }, objectArea: { required: true, type: () => Number, nullable: true, minimum: 0, maximum: 1000000 }, territoryArea: { required: true, type: () => Number, nullable: true, minimum: 0, maximum: 1000000 }, ceilingHeight: { required: true, type: () => Number, nullable: true }, floor: { required: true, type: () => Number, nullable: true }, waterSupply: { required: true, nullable: true }, gasSupply: { required: true, nullable: true }, electricitySupply: { required: true, nullable: true }, objectPlacement: { required: true, nullable: true }, yearOfConstruction: { required: true, type: () => Number, nullable: true, minimum: 1800, maximum: 2023 }, communications: { required: true, enum: require("../../../../../infrastructure/enums").CommunicationsEnum, isArray: true } };
    }
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, graphql_1.Field)(() => String, { description: 'apartmentId' }),
    __metadata("design:type", String)
], EditApartmentAdDetailsRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(8),
    (0, class_validator_1.IsInt)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { description: '0 equal studio apartment, 8 mean 8+ number of rooms' }),
    __metadata("design:type", Number)
], EditApartmentAdDetailsRequest.prototype, "numberOfRooms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1000000),
    (0, class_validator_1.IsInt)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], EditApartmentAdDetailsRequest.prototype, "numberOfGuests", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], EditApartmentAdDetailsRequest.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1000000),
    (0, class_validator_1.IsInt)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Object)
], EditApartmentAdDetailsRequest.prototype, "totalArea", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1000000),
    (0, class_validator_1.IsInt)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Object)
], EditApartmentAdDetailsRequest.prototype, "landArea", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1000000),
    (0, class_validator_1.IsInt)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Object)
], EditApartmentAdDetailsRequest.prototype, "objectArea", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1000000),
    (0, class_validator_1.IsInt)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Object)
], EditApartmentAdDetailsRequest.prototype, "territoryArea", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Object)
], EditApartmentAdDetailsRequest.prototype, "ceilingHeight", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Object)
], EditApartmentAdDetailsRequest.prototype, "floor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], EditApartmentAdDetailsRequest.prototype, "waterSupply", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], EditApartmentAdDetailsRequest.prototype, "gasSupply", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], EditApartmentAdDetailsRequest.prototype, "electricitySupply", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], EditApartmentAdDetailsRequest.prototype, "objectPlacement", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1800),
    (0, class_validator_1.Max)(2023),
    (0, class_validator_1.IsInt)(),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Object)
], EditApartmentAdDetailsRequest.prototype, "yearOfConstruction", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], EditApartmentAdDetailsRequest.prototype, "communications", void 0);
EditApartmentAdDetailsRequest = __decorate([
    (0, graphql_1.InputType)()
], EditApartmentAdDetailsRequest);
exports.EditApartmentAdDetailsRequest = EditApartmentAdDetailsRequest;
//# sourceMappingURL=edit-apartment-ad-details.request.dto.js.map