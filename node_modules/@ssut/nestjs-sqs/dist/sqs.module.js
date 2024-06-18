"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var SqsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqsModule = void 0;
const common_1 = require("@nestjs/common");
const sqs_service_1 = require("./sqs.service");
const sqs_constants_1 = require("./sqs.constants");
const discovery_1 = require("@nestjs-plus/discovery");
let SqsModule = SqsModule_1 = class SqsModule {
    static register(options) {
        const sqsOptions = {
            provide: sqs_constants_1.SQS_OPTIONS,
            useValue: options,
        };
        const sqsProvider = {
            provide: sqs_service_1.SqsService,
            useFactory: (sqsOptions, discover) => new sqs_service_1.SqsService(options, discover),
            inject: [sqs_constants_1.SQS_OPTIONS, discovery_1.DiscoveryService],
        };
        return {
            global: true,
            module: SqsModule_1,
            imports: [
                discovery_1.DiscoveryModule,
            ],
            providers: [
                sqsOptions,
                sqsProvider,
            ],
            exports: [
                sqsProvider,
            ],
        };
    }
    static registerAsync(options) {
        var _a;
        const asyncProviders = this.createAsyncProviders(options);
        const sqsProvider = {
            provide: sqs_service_1.SqsService,
            useFactory: (options, discover) => new sqs_service_1.SqsService(options, discover),
            inject: [sqs_constants_1.SQS_OPTIONS, discovery_1.DiscoveryService],
        };
        return {
            global: true,
            module: SqsModule_1,
            imports: [discovery_1.DiscoveryModule, ...((_a = options.imports) !== null && _a !== void 0 ? _a : [])],
            providers: [
                ...asyncProviders,
                sqsProvider,
            ],
            exports: [
                sqsProvider,
            ],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
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
                provide: sqs_constants_1.SQS_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const inject = [
            (options.useClass || options.useExisting),
        ];
        return {
            provide: sqs_constants_1.SQS_OPTIONS,
            useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () { return yield optionsFactory.createOptions(); }),
            inject,
        };
    }
};
SqsModule = SqsModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [discovery_1.DiscoveryModule],
        providers: [sqs_service_1.SqsService],
        exports: [sqs_service_1.SqsService],
    })
], SqsModule);
exports.SqsModule = SqsModule;
