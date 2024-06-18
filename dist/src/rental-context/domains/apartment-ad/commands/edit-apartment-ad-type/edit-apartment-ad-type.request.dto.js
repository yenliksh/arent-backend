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
exports.EditApartmentAdTypeRequest = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const types_1 = require("../../domain/types");
let EditApartmentAdTypeRequest = class EditApartmentAdTypeRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, apartmentCategory: { required: true, enum: require("../../domain/types").ApartmentCategory }, apartmentType: { required: false, nullable: true } };
    }
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, graphql_1.Field)(() => String, { description: 'apartmentId' }),
    __metadata("design:type", String)
], EditApartmentAdTypeRequest.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsEnum)(types_1.ApartmentCategory),
    (0, graphql_1.Field)(() => types_1.ApartmentCategory),
    __metadata("design:type", String)
], EditApartmentAdTypeRequest.prototype, "apartmentCategory", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(types_1.ApartmentType),
    (0, graphql_1.Field)(() => types_1.ApartmentType, { nullable: true }),
    __metadata("design:type", Object)
], EditApartmentAdTypeRequest.prototype, "apartmentType", void 0);
EditApartmentAdTypeRequest = __decorate([
    (0, graphql_1.InputType)()
], EditApartmentAdTypeRequest);
exports.EditApartmentAdTypeRequest = EditApartmentAdTypeRequest;
//# sourceMappingURL=edit-apartment-ad-type.request.dto.js.map