import { DynamicModule } from '@nestjs/common';
import { InnopayPaymentModuleAsyncOptions } from './types/innopay-payment-module.types';
export declare class InnopayPaymentModule {
    static forRootAsync(options: InnopayPaymentModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
