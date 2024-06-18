import { DeleteObjectOutput, HeadObjectOutput, ObjectKey } from 'aws-sdk/clients/s3';
import { S3ModuleOptions } from '../cloud-files-storage.types';
import { S3Service } from './s3.service';
declare type fileActions = 'putObject' | 'getObject';
declare type BucketType = 'private' | 'public';
export declare class CloudFilesStorageService {
    private readonly s3Service;
    private readonly options;
    constructor(s3Service: S3Service, options: S3ModuleOptions);
    private _getBucketName;
    getSignedUrl(bucket: BucketType, action: fileActions, input: {
        fileKey: string;
        contentType?: string;
    }): Promise<string>;
    headObject(filekey: ObjectKey, bucket: BucketType): Promise<HeadObjectOutput>;
    deleteObject(filekey: ObjectKey, bucket: BucketType): Promise<DeleteObjectOutput>;
}
export {};
