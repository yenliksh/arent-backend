import { DynamicModule } from '@nestjs/common';
import { SqsModuleAsyncOptions, SqsOptions } from './sqs.types';
export declare class SqsModule {
    static register(options: SqsOptions): DynamicModule;
    static registerAsync(options: SqsModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
