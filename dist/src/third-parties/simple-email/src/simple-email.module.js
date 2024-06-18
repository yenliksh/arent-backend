"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SimpleEmailModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleEmailModule = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("./services");
const simple_email_types_1 = require("./simple-email.types");
let SimpleEmailModule = SimpleEmailModule_1 = class SimpleEmailModule {
    static forRootAsync(options) {
        const asyncProviders = this.createAsyncProviders(options);
        return {
            module: SimpleEmailModule_1,
            imports: options.imports,
            providers: [...asyncProviders, services_1.SimpleEmailService, services_1.SESService],
            exports: [services_1.SimpleEmailService, services_1.SESService],
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
                provide: simple_email_types_1.SIMPLE_EMAIL_OPTIONS_PROVIDER_NAME,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const inject = [options.useClass];
        return {
            provide: simple_email_types_1.SIMPLE_EMAIL_OPTIONS_PROVIDER_NAME,
            useFactory: async (optionsFactory) => await optionsFactory.createSESOptions(),
            inject,
        };
    }
};
SimpleEmailModule = SimpleEmailModule_1 = __decorate([
    (0, common_1.Module)({})
], SimpleEmailModule);
exports.SimpleEmailModule = SimpleEmailModule;
//# sourceMappingURL=simple-email.module.js.map