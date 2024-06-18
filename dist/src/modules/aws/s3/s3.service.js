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
exports.S3Service = exports.buildImageContentType = void 0;
const apartment_ad_orm_entity_1 = require("../../../infrastructure/database/entities/apartment-ad.orm-entity");
const enums_1 = require("../../../infrastructure/enums");
const utils_1 = require("../../../libs/utils");
const regexps_1 = require("../../../libs/utils/regexps");
const common_1 = require("@nestjs/common");
const src_1 = require("../../../third-parties/cloud-files-storage/src");
const enums_2 = require("./enums");
const buildImageContentType = (fileExt) => `image/${fileExt}`;
exports.buildImageContentType = buildImageContentType;
let S3Service = class S3Service {
    constructor(cloudFileStorageService) {
        this.cloudFileStorageService = cloudFileStorageService;
    }
    async getSignedUrl(userId, { fileName, fileCategory, apartmentAdId, chatId }) {
        let fileKey;
        let bucketType;
        const extension = (0, utils_1.getFileExt)(fileName);
        if (!extension) {
            throw new common_1.UnprocessableEntityException('Extension doe not exist');
        }
        if (apartmentAdId) {
            const found = await apartment_ad_orm_entity_1.ApartmentAdOrmEntity.query().findById(apartmentAdId);
            if (!found)
                throw new common_1.NotFoundException('Apartment ad does not exist');
        }
        const generatedName = `c_${new Date().getTime()}.${extension}`;
        switch (fileCategory) {
            case enums_1.FileCategory.AVATARS:
                fileKey = `users/${userId}/avatars/${generatedName}`;
                bucketType = enums_2.BucketType.PUBLIC;
                break;
            case enums_1.FileCategory.APARTMENT_AD_MEDIA:
                fileKey = `users/${userId}/apartment-ad/${apartmentAdId}/media/${generatedName}`;
                bucketType = enums_2.BucketType.PUBLIC;
                break;
            case enums_1.FileCategory.APARTMENT_AD_DOCUMENTS:
                fileKey = `users/${userId}/apartment-ad/${apartmentAdId}/documents/${generatedName}`;
                bucketType = enums_2.BucketType.PRIVATE;
                break;
            case enums_1.FileCategory.IDENTITY_DOCUMENTS:
                fileKey = `users/${userId}/identity-documents/${generatedName}`;
                bucketType = enums_2.BucketType.PRIVATE;
                break;
            case enums_1.FileCategory.CHAT_MEDIA:
                fileKey = `chats/${chatId}/users/${userId}/media/${generatedName}`;
                bucketType = enums_2.BucketType.PRIVATE;
                break;
            default:
                throw new common_1.UnprocessableEntityException('Select bucket does not exist');
        }
        return this.cloudFileStorageService.getSignedUrl(bucketType, 'putObject', {
            fileKey,
            contentType: (0, exports.buildImageContentType)(extension),
        });
    }
    async deleteFromS3(userId, { fileCategory, fileKey }) {
        let bucketType;
        const extractedUuid = regexps_1.uuidRegexpGlobal.exec(fileKey);
        const userHasNotRightsToDelete = !extractedUuid || extractedUuid[0] !== userId;
        if (userHasNotRightsToDelete) {
            throw new common_1.UnprocessableEntityException('Access denied');
        }
        switch (fileCategory) {
            case enums_1.FileCategory.AVATARS:
            case enums_1.FileCategory.APARTMENT_AD_MEDIA:
                bucketType = enums_2.BucketType.PUBLIC;
                break;
            case enums_1.FileCategory.IDENTITY_DOCUMENTS:
            case enums_1.FileCategory.CHAT_MEDIA:
            case enums_1.FileCategory.APARTMENT_AD_DOCUMENTS:
                bucketType = enums_2.BucketType.PRIVATE;
                break;
            default:
                throw new common_1.UnprocessableEntityException('Select bucket does not exist');
        }
        return this.cloudFileStorageService.deleteObject(fileKey, bucketType);
    }
};
S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [src_1.CloudFilesStorageService])
], S3Service);
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map