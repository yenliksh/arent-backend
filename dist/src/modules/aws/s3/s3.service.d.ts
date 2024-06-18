import { CloudFilesStorageService } from '@third-parties/cloud-files-storage/src';
import { DeleteFromS3Dto, GetSignedUrlDto } from './s3.dto';
export declare const buildImageContentType: (fileExt: string) => string;
export declare class S3Service {
    private readonly cloudFileStorageService;
    constructor(cloudFileStorageService: CloudFilesStorageService);
    getSignedUrl(userId: string, { fileName, fileCategory, apartmentAdId, chatId }: GetSignedUrlDto): Promise<string>;
    deleteFromS3(userId: string, { fileCategory, fileKey }: DeleteFromS3Dto): Promise<import("aws-sdk/clients/s3").DeleteObjectOutput>;
}
