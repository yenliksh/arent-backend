import { DynamicModule } from '@nestjs/common';
import { S3ModuleAsyncOptions } from './cloud-files-storage.types';
export declare class CloudFilesStorageModule {
    static forRootAsync(options: S3ModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
