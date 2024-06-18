import { ConfigService } from '@nestjs/config';
import { SmsCenterKzModuleOptions } from '@third-parties/sms-center-kz/src';

export const smsKzFactory = {
  useFactory: (configService: ConfigService): SmsCenterKzModuleOptions => {
    return {
      login: configService.get<string>('smsCenter.login') as string,
      password: configService.get<string>('smsCenter.password') as string,
      sender: configService.get<string>('smsCenter.sender') as string,
      link: configService.get<string>('smsCenter.link') as string,
    };
  },
  inject: [ConfigService],
};
