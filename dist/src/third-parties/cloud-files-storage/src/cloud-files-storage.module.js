"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CloudFilesStorageModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudFilesStorageModule = void 0;
const common_1 = require("@nestjs/common");
const cloud_files_storage_types_1 = require("./cloud-files-storage.types");
const services_1 = require("./services");
let CloudFilesStorageModule = CloudFilesStorageModule_1 = class CloudFilesStorageModule {
    static forRootAsync(options) {
        const asyncProviders = this.createAsyncProviders(options);
        return {
            module: CloudFilesStorageModule_1,
            imports: options.imports,
            providers: [...asyncProviders, services_1.CloudFilesStorageService, services_1.S3Service],
            exports: [services_1.CloudFilesStorageService, services_1.S3Service],
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
                provide: cloud_files_storage_types_1.CLOUD_FILES_STORAGE_OPTIONS_PROVIDER_NAME,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const inject = [options.useClass];
        return {
            provide: cloud_files_storage_types_1.CLOUD_FILES_STORAGE_OPTIONS_PROVIDER_NAME,
            useFactory: async (optionsFactory) => {
                const options = await optionsFactory.createS3Options();
                return options;
            },
            inject,
        };
    }
};
CloudFilesStorageModule = CloudFilesStorageModule_1 = __decorate([
    (0, common_1.Module)({})
], CloudFilesStorageModule);
exports.CloudFilesStorageModule = CloudFilesStorageModule;
//# sourceMappingURL=cloud-files-storage.module.js.map