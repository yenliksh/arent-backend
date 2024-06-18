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
exports.EditApartmentAdAddressRequest = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let EditApartmentAdAddressRequest = class EditApartmentAdAddressRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, country: { required: true, type: () => String }, city: { required: true, type: () => String }, region: { required: false, type: () => String }, street: { required: true, type: () => String }, houseNumber: { required: true, type: () => String }, lat: { required: true, type: () => Number }, lng: { required: true, type: () => Number } };
    }
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, graphql_1.Field)(() => String, { description: 'apartmentId' }),
    __metadata("design:type", String)
], EditApartmentAdAddressRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], EditApartmentAdAddressRequest.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], EditApartmentAdAddressRequest.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], EditApartmentAdAddressRequest.prototype, "region", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], EditApartmentAdAddressRequest.prototype, "street", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], EditApartmentAdAddressRequest.prototype, "houseNumber", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsLatitude)(),
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], EditApartmentAdAddressRequest.prototype, "lat", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsLongitude)(),
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], EditApartmentAdAddressRequest.prototype, "lng", void 0);
EditApartmentAdAddressRequest = __decorate([
    (0, graphql_1.InputType)()
], EditApartmentAdAddressRequest);
exports.EditApartmentAdAddressRequest = EditApartmentAdAddressRequest;
//# sourceMappingURL=edit-apartment-ad-address.request.dto.js.map