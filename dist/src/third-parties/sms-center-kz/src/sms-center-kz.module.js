"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SmsCenterKzModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsCenterKzModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const sms_center_kz_service_1 = require("./sms-center-kz.service");
const sms_center_kz_types_1 = require("./sms-center-kz.types");
let SmsCenterKzModule = SmsCenterKzModule_1 = class SmsCenterKzModule {
    static forRootAsync(options) {
        const asyncProviders = this.createAsyncProviders(options);
        options.imports = options.imports
            ? [
                ...options.imports,
                axios_1.HttpModule.register({
                    maxRedirects: 5,
                }),
            ]
            : [
                axios_1.HttpModule.register({
                    maxRedirects: 5,
                }),
            ];
        return {
            module: SmsCenterKzModule_1,
            imports: options.imports,
            providers: [...asyncProviders, sms_center_kz_service_1.SmsCenterKzService],
            exports: [sms_center_kz_service_1.SmsCenterKzService],
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
                provide: sms_center_kz_types_1.SMS_CENTER_KZ_OPTIONS_PROVIDER_NAME,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const inject = [options.useClass];
        return {
            provide: sms_center_kz_types_1.SMS_CENTER_KZ_OPTIONS_PROVIDER_NAME,
            useFactory: async (optionsFactory) => await optionsFactory.createSmsCenterKzOptions(),
            inject,
        };
    }
};
SmsCenterKzModule = SmsCenterKzModule_1 = __decorate([
    (0, common_1.Module)({})
], SmsCenterKzModule);
exports.SmsCenterKzModule = SmsCenterKzModule;
//# sourceMappingURL=sms-center-kz.module.js.map