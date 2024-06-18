import { ConfigService } from '@nestjs/config';
import { SQSModuleOptions } from '@third-parties/simple-queue/src';
export declare const sqsFactory: {
    useFactory: (configService: ConfigService) => SQSModuleOptions;
    inject: (typeof ConfigService)[];
};
