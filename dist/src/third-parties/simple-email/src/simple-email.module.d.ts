import { DynamicModule } from '@nestjs/common';
import { SESModuleAsyncOptions } from './simple-email.types';
export declare class SimpleEmailModule {
    static forRootAsync(options: SESModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
