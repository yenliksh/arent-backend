"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var InnopayPaymentModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopayPaymentModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const innopay_soap_reader_1 = require("./sdk/innopay-soap/innopay-soap.reader");
const innopay_soap_writer_1 = require("./sdk/innopay-soap/innopay-soap.writer");
const innopay_base_sdk_service_1 = require("./sdk/services/innopay-base-sdk.service");
const innopay_card_sdk_service_1 = require("./sdk/services/innopay-card-sdk.service");
const innopay_cash_in_sdk_service_1 = require("./sdk/services/innopay-cash-in-sdk.service");
const innopay_cash_out_sdk_service_1 = require("./sdk/services/innopay-cash-out-sdk.service");
const innopay_status_sdk_service_1 = require("./sdk/services/innopay-status-sdk.service");
const innopay_card_service_1 = require("./services/innopay-card.service");
const innopay_cash_in_service_1 = require("./services/innopay-cash-in.service");
const innopay_cash_out_service_1 = require("./services/innopay-cash-out.service");
const innopay_status_service_1 = require("./services/innopay-status.service");
const innopay_payment_module_types_1 = require("./types/innopay-payment-module.types");
let InnopayPaymentModule = InnopayPaymentModule_1 = class InnopayPaymentModule {
    static forRootAsync(options) {
        const asyncProviders = this.createAsyncProviders(options);
        const sdkProviders = [
            innopay_soap_writer_1.InnopaySoapWriter,
            innopay_soap_reader_1.InnopaySoapReader,
            innopay_base_sdk_service_1.InnopayBaseSdkService,
            innopay_card_sdk_service_1.InnopayCardSdkService,
            innopay_cash_in_sdk_service_1.InnopayCashInSdkService,
            innopay_cash_out_sdk_service_1.InnopayCashOutSdkService,
            innopay_status_sdk_service_1.InnopayStatusSdkService,
        ];
        const serviceProviders = [innopay_card_service_1.InnopayCardService, innopay_cash_in_service_1.InnopayCashInService, innopay_cash_out_service_1.InnopayCashOutService, innopay_status_service_1.InnopayStatusService];
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
            module: InnopayPaymentModule_1,
            imports: options.imports,
            providers: [...asyncProviders, ...sdkProviders, ...serviceProviders],
            exports: serviceProviders,
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
                provide: innopay_payment_module_types_1.INNOPAY_PAYMENT_OPTIONS_PROVIDER_NAME,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const inject = [options.useClass];
        return {
            provide: innopay_payment_module_types_1.INNOPAY_PAYMENT_OPTIONS_PROVIDER_NAME,
            useFactory: async (optionsFactory) => {
                const options = await optionsFactory.createInnopayPaymentOptions();
                return options;
            },
            inject,
        };
    }
};
InnopayPaymentModule = InnopayPaymentModule_1 = __decorate([
    (0, common_1.Module)({})
], InnopayPaymentModule);
exports.InnopayPaymentModule = InnopayPaymentModule;
//# sourceMappingURL=innopay-payment.module.js.map