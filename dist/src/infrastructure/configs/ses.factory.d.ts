import { ConfigService } from '@nestjs/config';
import { SESModuleOptions } from '@third-parties/simple-email/src';
export declare const sesFactory: {
    useFactory: (configService: ConfigService) => SESModuleOptions;
    inject: (typeof ConfigService)[];
};
