import { ConfigService } from '@nestjs/config';
import { SmsCenterKzModuleOptions } from '@third-parties/sms-center-kz/src';
export declare const smsKzFactory: {
    useFactory: (configService: ConfigService) => SmsCenterKzModuleOptions;
    inject: (typeof ConfigService)[];
};
