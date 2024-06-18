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
exports.InnopayCashOutSdkService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../types/enums");
const innopay_soap_reader_1 = require("../innopay-soap/innopay-soap.reader");
const innopay_soap_writer_1 = require("../innopay-soap/innopay-soap.writer");
const innopay_base_sdk_service_1 = require("./innopay-base-sdk.service");
let InnopayCashOutSdkService = class InnopayCashOutSdkService {
    constructor(soapWriter, soapReader, baseSdkService) {
        this.soapWriter = soapWriter;
        this.soapReader = soapReader;
        this.baseSdkService = baseSdkService;
    }
    async startCashOutToRegisteredCard(req) {
        const body = this.soapWriter.startCashOutToRegisteredCard(this.baseSdkService.realMerchantId, this.baseSdkService.merchantKeyword, req);
        const res = await this.baseSdkService.innopayRequest(enums_1.InnopayServiceType.E_COM, body);
        return this.soapReader.startCashOutToRegisteredCard(res.data);
    }
    async completeCashOutTransaction(req) {
        const body = this.soapWriter.completeCashOutTransaction(this.baseSdkService.realMerchantId, this.baseSdkService.merchantKeyword, req);
        const res = await this.baseSdkService.innopayRequest(enums_1.InnopayServiceType.E_COM, body);
        return this.soapReader.completeCashOutTransaction(res.data);
    }
};
InnopayCashOutSdkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [innopay_soap_writer_1.InnopaySoapWriter,
        innopay_soap_reader_1.InnopaySoapReader,
        innopay_base_sdk_service_1.InnopayBaseSdkService])
], InnopayCashOutSdkService);
exports.InnopayCashOutSdkService = InnopayCashOutSdkService;
//# sourceMappingURL=innopay-cash-out-sdk.service.js.map