import { ModuleMetadata, Type } from '@nestjs/common';
import { RedisOptions } from 'ioredis';
export declare const CLOUD_CACHE_OPTIONS_PROVIDER_NAME = "CLOUD_CACHE_STORAGE";
export interface CloudCacheModuleOptions extends RedisOptions {
}
export interface CloudCacheOptionsFactory {
    createOptions(): Promise<CloudCacheModuleOptions> | CloudCacheModuleOptions;
}
export interface CloudCacheModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory?: (...args: any[]) => Promise<CloudCacheModuleOptions> | CloudCacheModuleOptions;
    useClass?: Type<CloudCacheOptionsFactory>;
    inject?: any[];
}
