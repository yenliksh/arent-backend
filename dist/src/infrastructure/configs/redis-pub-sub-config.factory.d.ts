import { ConfigService } from '@nestjs/config';
import { CloudCacheModuleOptions } from '@third-parties/cloud-cache-storage/src';
export declare const redisPubSubConfigFactory: {
    useFactory: (configService: ConfigService) => CloudCacheModuleOptions;
    inject: (typeof ConfigService)[];
};
