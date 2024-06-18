import { BullRootModuleOptions } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
export declare const bullConfigFactory: {
    useFactory: (configService: ConfigService) => BullRootModuleOptions;
    inject: (typeof ConfigService)[];
};
