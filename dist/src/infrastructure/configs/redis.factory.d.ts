import { ConfigService } from '@nestjs/config';
import { CloudCacheModuleOptions } from '@third-parties/cloud-cache-storage/src';
export declare const redisConfigFactory: {
    useFactory: (configService: ConfigService) => CloudCacheModuleOptions;
    inject: (typeof ConfigService)[];
};
