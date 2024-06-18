import { ConfigService } from '@nestjs/config';
import { SESModuleOptions } from '@third-parties/simple-email/src';

export const sesFactory = {
  useFactory: (configService: ConfigService): SESModuleOptions => {
    return {
      accessKeyId: configService.get<string>('ses.accessKey') as string,
      secretAccessKey: configService.get<string>('ses.secretAccessKey') as string,
      region: configService.get<string>('ses.region') as string,
    };
  },
  inject: [ConfigService],
};
