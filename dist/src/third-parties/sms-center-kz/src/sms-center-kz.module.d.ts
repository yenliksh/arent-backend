import { DynamicModule } from '@nestjs/common';
import { SmsCenterKzModuleAsyncOptions } from './sms-center-kz.types';
export declare class SmsCenterKzModule {
    static forRootAsync(options: SmsCenterKzModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
