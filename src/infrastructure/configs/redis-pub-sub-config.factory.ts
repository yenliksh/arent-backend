import { ConfigService } from '@nestjs/config';
import { CloudCacheModuleOptions } from '@third-parties/cloud-cache-storage/src';

export const redisPubSubConfigFactory = {
  useFactory: (configService: ConfigService): CloudCacheModuleOptions => {
    return {
      port: configService.get<number>('redis.pubSub.port'),
      host: configService.get<string>('redis.pubSub.host'),
    };
  },
  inject: [ConfigService],
};
