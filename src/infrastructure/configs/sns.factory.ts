import { ConfigService } from '@nestjs/config';
import { SNSModuleOptions } from '@third-parties/simple-notification/src';

export const snsFactory = {
  useFactory: (configService: ConfigService): SNSModuleOptions => {
    return {
      accessKeyId: configService.get<string>('sns.accessKey') as string,
      secretAccessKey: configService.get<string>('sns.secretAccessKey') as string,
      region: configService.get<string>('sns.region') as string,
    };
  },
  inject: [ConfigService],
};
