"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopayBaseSdkService = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const enums_1 = require("../../types/enums");
const innopay_payment_module_types_1 = require("../../types/innopay-payment-module.types");
let InnopayBaseSdkService = class InnopayBaseSdkService {
    constructor(httpService, options) {
        this.httpService = httpService;
        this.options = options;
        this.urls = {
            [enums_1.InnopayServiceType.ONE_CLICK]: () => {
                const url = this.options.oneClickUrlApi;
                if (!url) {
                    throw new exceptions_1.ArgumentNotProvidedException('One Click url api required');
                }
                return url;
            },
            [enums_1.InnopayServiceType.E_COM]: () => {
                const url = this.options.eComUrlApi;
                if (!url) {
                    throw new exceptions_1.ArgumentNotProvidedException('E-commerce url api required');
                }
                return url;
            },
        };
    }
    async innopayRequest(serviceType, body) {
        const url = this.urls[serviceType]();
        try {
            const res = await this.httpService
                .post(url, body, {
                headers: {
                    'Content-Type': 'text/plain',
                },
            })
                .toPromise();
            if (!res) {
                throw new Error(`Fetch to ${url} return null`);
            }
            return res;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    get realMerchantId() {
        const merchantId = this.options.realMerchantId;
        return this.validatedMerchantId(merchantId);
    }
    get virtualMerchantId() {
        const merchantId = this.options.virtualMerchantId;
        return this.validatedMerchantId(merchantId);
    }
    get merchantKeyword() {
        const merchantKeyword = this.options.merchantKeyword;
        if (!merchantKeyword) {
            throw new exceptions_1.ArgumentNotProvidedException('MerchantKeyword required');
        }
        return merchantKeyword;
    }
    validatedMerchantId(value) {
        if (!value) {
            throw new exceptions_1.ArgumentNotProvidedException('MerchantId required');
        }
        if (value.length !== 15) {
            throw new exceptions_1.ArgumentNotProvidedException(`MerchantId length must be 15`);
        }
        return value;
    }
};
InnopayBaseSdkService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(innopay_payment_module_types_1.INNOPAY_PAYMENT_OPTIONS_PROVIDER_NAME)),
    __metadata("design:paramtypes", [axios_1.HttpService, Object])
], InnopayBaseSdkService);
exports.InnopayBaseSdkService = InnopayBaseSdkService;
//# sourceMappingURL=innopay-base-sdk.service.js.map