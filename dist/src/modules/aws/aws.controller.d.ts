import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { DeleteFromS3Dto, GetSignedUrlDto } from './s3/s3.dto';
import { S3Service } from './s3/s3.service';
export declare class AwsController {
    private s3Service;
    constructor(s3Service: S3Service);
    getSignedUrl(getSignedUrlDto: GetSignedUrlDto, userId: UserOrmEntity['id']): Promise<string>;
    deleteFromS3(deleteFromS3Dto: DeleteFromS3Dto, userId: UserOrmEntity['id']): Promise<import("aws-sdk/clients/s3").DeleteObjectOutput>;
}
