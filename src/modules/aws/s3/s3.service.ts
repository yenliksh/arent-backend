import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { FileCategory } from '@infrastructure/enums';
import { getFileExt } from '@libs/utils';
import { uuidRegexpGlobal } from '@libs/utils/regexps';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CloudFilesStorageService } from '@third-parties/cloud-files-storage/src';

import { BucketType } from './enums';
import { DeleteFromS3Dto, GetSignedUrlDto } from './s3.dto';

export const buildImageContentType = (fileExt: string) => `image/${fileExt}`;

@Injectable()
export class S3Service {
  constructor(private readonly cloudFileStorageService: CloudFilesStorageService) {}

  async getSignedUrl(userId: string, { fileName, fileCategory, apartmentAdId, chatId }: GetSignedUrlDto) {
    let fileKey;
    let bucketType;

    const extension = getFileExt(fileName);

    if (!extension) {
      throw new UnprocessableEntityException('Extension doe not exist');
    }

    if (apartmentAdId) {
      const found = await ApartmentAdOrmEntity.query().findById(apartmentAdId);
      if (!found) throw new NotFoundException('Apartment ad does not exist');
    }

    const generatedName = `c_${new Date().getTime()}.${extension}`;

    switch (fileCategory) {
      case FileCategory.AVATARS:
        fileKey = `users/${userId}/avatars/${generatedName}`;
        bucketType = BucketType.PUBLIC;
        break;
      case FileCategory.APARTMENT_AD_MEDIA:
        fileKey = `users/${userId}/apartment-ad/${apartmentAdId}/media/${generatedName}`;
        bucketType = BucketType.PUBLIC;
        break;
      case FileCategory.APARTMENT_AD_DOCUMENTS:
        fileKey = `users/${userId}/apartment-ad/${apartmentAdId}/documents/${generatedName}`;
        bucketType = BucketType.PRIVATE;
        break;
      case FileCategory.IDENTITY_DOCUMENTS:
        fileKey = `users/${userId}/identity-documents/${generatedName}`;
        bucketType = BucketType.PRIVATE;
        break;
      case FileCategory.CHAT_MEDIA:
        fileKey = `chats/${chatId}/users/${userId}/media/${generatedName}`;
        bucketType = BucketType.PRIVATE;
        break;
      default:
        throw new UnprocessableEntityException('Select bucket does not exist');
    }

    return this.cloudFileStorageService.getSignedUrl(bucketType, 'putObject', {
      fileKey,
      contentType: buildImageContentType(extension),
    });
  }

  async deleteFromS3(userId: string, { fileCategory, fileKey }: DeleteFromS3Dto) {
    let bucketType: BucketType;

    const extractedUuid = uuidRegexpGlobal.exec(fileKey);

    const userHasNotRightsToDelete = !extractedUuid || extractedUuid[0] !== userId;

    if (userHasNotRightsToDelete) {
      throw new UnprocessableEntityException('Access denied');
    }
    switch (fileCategory) {
      case FileCategory.AVATARS:
      case FileCategory.APARTMENT_AD_MEDIA:
        bucketType = BucketType.PUBLIC;
        break;
      case FileCategory.IDENTITY_DOCUMENTS:
      case FileCategory.CHAT_MEDIA:
      case FileCategory.APARTMENT_AD_DOCUMENTS:
        bucketType = BucketType.PRIVATE;
        break;
      default:
        throw new UnprocessableEntityException('Select bucket does not exist');
    }

    return this.cloudFileStorageService.deleteObject(fileKey, bucketType);
  }
}
