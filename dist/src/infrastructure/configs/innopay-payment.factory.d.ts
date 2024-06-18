import { ConfigService } from '@nestjs/config';
import { InnopayPaymentModuleOptions } from '@third-parties/innopay-payment/src/types/innopay-payment-module.types';
export declare const innopayPaymentFactory: {
    useFactory: (configService: ConfigService) => InnopayPaymentModuleOptions;
    inject: (typeof ConfigService)[];
};
