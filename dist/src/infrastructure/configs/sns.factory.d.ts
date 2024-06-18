import { ConfigService } from '@nestjs/config';
import { SNSModuleOptions } from '@third-parties/simple-notification/src';
export declare const snsFactory: {
    useFactory: (configService: ConfigService) => SNSModuleOptions;
    inject: (typeof ConfigService)[];
};
