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
exports.AdminProfileEditUserInfoDto = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../../../../rental-context/domains/user/domain/types");
const validators_1 = require("../../../../infrastructure/validators");
const class_validator_1 = require("class-validator");
class AdminProfileEditGuarantorDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, phone: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminProfileEditGuarantorDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminProfileEditGuarantorDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.Validate)(validators_1.PhoneValidator),
    __metadata("design:type", String)
], AdminProfileEditGuarantorDto.prototype, "phone", void 0);
class AdminProfileEditNameDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, middleName: { required: false, type: () => String, nullable: true } };
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminProfileEditNameDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminProfileEditNameDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], AdminProfileEditNameDto.prototype, "middleName", void 0);
class AdminProfileEditUserInfoDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { birthdate: { required: false, type: () => String }, gender: { required: false, enum: require("../../../../rental-context/domains/user/domain/types").GenderType }, guarantor: { required: false, type: () => AdminProfileEditGuarantorDto }, userName: { required: false, type: () => AdminProfileEditNameDto } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Validate)(validators_1.DateISOValidator),
    __metadata("design:type", String)
], AdminProfileEditUserInfoDto.prototype, "birthdate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(types_1.GenderType),
    __metadata("design:type", String)
], AdminProfileEditUserInfoDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AdminProfileEditGuarantorDto)
], AdminProfileEditUserInfoDto.prototype, "guarantor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AdminProfileEditNameDto)
], AdminProfileEditUserInfoDto.prototype, "userName", void 0);
exports.AdminProfileEditUserInfoDto = AdminProfileEditUserInfoDto;
//# sourceMappingURL=admin-profile-edit.dto.js.map