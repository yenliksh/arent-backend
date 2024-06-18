import { BullRootModuleOptions } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';

export const bullConfigFactory = {
  useFactory: (configService: ConfigService): BullRootModuleOptions => {
    return {
      redis: {
        port: configService.get<number>('redis.common.port'),
        host: configService.get<string>('redis.common.host'),
      },
    };
  },
  inject: [ConfigService],
};
