"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GoogleMapsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleMapsModule = void 0;
const common_1 = require("@nestjs/common");
const google_maps_types_1 = require("./google-maps.types");
const services_1 = require("./services");
let GoogleMapsModule = GoogleMapsModule_1 = class GoogleMapsModule {
    static forRootAsync(options) {
        const asyncProviders = this.createAsyncProviders(options);
        return {
            module: GoogleMapsModule_1,
            imports: options.imports,
            providers: [...asyncProviders, services_1.GoogleMapsService],
            exports: [services_1.GoogleMapsService],
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
                provide: google_maps_types_1.GOOGLE_MAPS_OPTIONS_PROVIDER_NAME,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const inject = [options.useClass];
        return {
            provide: google_maps_types_1.GOOGLE_MAPS_OPTIONS_PROVIDER_NAME,
            useFactory: async (optionsFactory) => await optionsFactory.createOptions(),
            inject,
        };
    }
};
GoogleMapsModule = GoogleMapsModule_1 = __decorate([
    (0, common_1.Module)({})
], GoogleMapsModule);
exports.GoogleMapsModule = GoogleMapsModule;
//# sourceMappingURL=google-maps.module.js.map