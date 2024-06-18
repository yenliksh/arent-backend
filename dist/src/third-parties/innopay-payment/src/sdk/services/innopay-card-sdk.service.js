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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopayCardSdkService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../types/enums");
const innopay_soap_reader_1 = require("../innopay-soap/innopay-soap.reader");
const innopay_soap_writer_1 = require("../innopay-soap/innopay-soap.writer");
const innopay_base_sdk_service_1 = require("./innopay-base-sdk.service");
let InnopayCardSdkService = class InnopayCardSdkService {
    constructor(soapWriter, soapReader, baseSdkService) {
        this.soapWriter = soapWriter;
        this.soapReader = soapReader;
        this.baseSdkService = baseSdkService;
    }
    async startCardRegistration(req) {
        const body = this.soapWriter.startCardRegistration(this.baseSdkService.virtualMerchantId, req);
        const res = await this.baseSdkService.innopayRequest(enums_1.InnopayServiceType.ONE_CLICK, body);
        return this.soapReader.startCardRegistration(res.data);
    }
    async completeCardRegistration(req) {
        const body = this.soapWriter.completeCardRegistration(this.baseSdkService.virtualMerchantId, req);
        const res = await this.baseSdkService.innopayRequest(enums_1.InnopayServiceType.ONE_CLICK, body);
        return this.soapReader.completeCardRegistration(res.data);
    }
    async deleteCardRegistration(req) {
        const body = this.soapWriter.deleteCardRegistration(this.baseSdkService.virtualMerchantId, req);
        const res = await this.baseSdkService.innopayRequest(enums_1.InnopayServiceType.ONE_CLICK, body);
        return this.soapReader.deleteCardRegistration(res.data);
    }
};
InnopayCardSdkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [innopay_soap_writer_1.InnopaySoapWriter,
        innopay_soap_reader_1.InnopaySoapReader,
        innopay_base_sdk_service_1.InnopayBaseSdkService])
], InnopayCardSdkService);
exports.InnopayCardSdkService = InnopayCardSdkService;
//# sourceMappingURL=innopay-card-sdk.service.js.map