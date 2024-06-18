import * as S3 from 'aws-sdk/clients/s3';
import { S3ModuleOptions } from '../cloud-files-storage.types';
export declare class S3Service {
    private readonly options;
    private _client;
    constructor(options: S3ModuleOptions);
    private createS3FromOptions;
    get client(): S3;
}
