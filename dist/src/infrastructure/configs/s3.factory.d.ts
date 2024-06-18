import { ConfigService } from '@nestjs/config';
import { S3ModuleOptions } from '@third-parties/cloud-files-storage/src';
export declare const s3Factory: {
    useFactory: (configService: ConfigService) => S3ModuleOptions;
    inject: (typeof ConfigService)[];
};
