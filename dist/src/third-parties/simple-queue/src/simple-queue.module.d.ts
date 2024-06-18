import { DynamicModule } from '@nestjs/common';
import { SQSModuleAsyncOptions } from './simple-queue.types';
export declare class SimpleQueueModule {
    static forRootAsync(options: SQSModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
