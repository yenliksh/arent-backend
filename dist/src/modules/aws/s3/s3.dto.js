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
exports.DeleteFromS3Dto = exports.GetSignedUrlDto = void 0;
const openapi = require("@nestjs/swagger");
const enums_1 = require("../../../infrastructure/enums");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GetSignedUrlDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { fileName: { required: true, type: () => String }, fileCategory: { required: true, enum: require("../../../infrastructure/enums").FileCategory }, apartmentAdId: { required: false, type: () => String }, chatId: { required: false, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetSignedUrlDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.FileCategory }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(enums_1.FileCategory),
    __metadata("design:type", String)
], GetSignedUrlDto.prototype, "fileCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.ValidateIf)((obj) => obj.fileCategory === enums_1.FileCategory.APARTMENT_AD_MEDIA || obj.fileCategory === enums_1.FileCategory.APARTMENT_AD_DOCUMENTS),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], GetSignedUrlDto.prototype, "apartmentAdId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.ValidateIf)((obj) => obj.fileCategory === enums_1.FileCategory.CHAT_MEDIA),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], GetSignedUrlDto.prototype, "chatId", void 0);
exports.GetSignedUrlDto = GetSignedUrlDto;
class DeleteFromS3Dto {
    static _OPENAPI_METADATA_FACTORY() {
        return { fileCategory: { required: true, enum: require("../../../infrastructure/enums").FileCategory }, fileKey: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.FileCategory }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(enums_1.FileCategory),
    __metadata("design:type", String)
], DeleteFromS3Dto.prototype, "fileCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeleteFromS3Dto.prototype, "fileKey", void 0);
exports.DeleteFromS3Dto = DeleteFromS3Dto;
//# sourceMappingURL=s3.dto.js.map