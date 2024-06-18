"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CloudCacheStorageModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudCacheStorageModule = void 0;
const common_1 = require("@nestjs/common");
const cloud_cache_storage_types_1 = require("./cloud-cache-storage.types");
const services_1 = require("./services");
let CloudCacheStorageModule = CloudCacheStorageModule_1 = class CloudCacheStorageModule {
    static forRootAsync(options) {
        const asyncProviders = this.createAsyncProviders(options);
        return {
            module: CloudCacheStorageModule_1,
            imports: options.imports,
            providers: [...asyncProviders, services_1.CloudCacheStorageService, services_1.RedisService],
            exports: [services_1.CloudCacheStorageService, services_1.RedisService],
        };
    }
    static createAsyncProviders(options) {
        if (options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        const useClass = options.useClass;
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: useClass,
                useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: cloud_cache_storage_types_1.CLOUD_CACHE_OPTIONS_PROVIDER_NAME,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const inject = [options.useClass];
        return {
            provide: cloud_cache_storage_types_1.CLOUD_CACHE_OPTIONS_PROVIDER_NAME,
            useFactory: async (optionsFactory) => await optionsFactory.createOptions(),
            inject,
        };
    }
};
CloudCacheStorageModule = CloudCacheStorageModule_1 = __decorate([
    (0, common_1.Module)({})
], CloudCacheStorageModule);
exports.CloudCacheStorageModule = CloudCacheStorageModule;
//# sourceMappingURL=cloud-cache-storage.module.js.map