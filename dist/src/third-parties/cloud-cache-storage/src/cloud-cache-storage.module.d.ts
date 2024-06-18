import { DynamicModule } from '@nestjs/common';
import { CloudCacheModuleAsyncOptions } from './cloud-cache-storage.types';
export declare class CloudCacheStorageModule {
    static forRootAsync(options: CloudCacheModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
