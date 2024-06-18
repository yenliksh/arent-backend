import { DynamicModule } from '@nestjs/common';
import { SNSModuleAsyncOptions } from './simple-notification.types';
export declare class SimpleNotificationModule {
    static forRootAsync(options: SNSModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
