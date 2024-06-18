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
exports.InnopayCashInService = void 0;
const exceptions_1 = require("../../../../libs/exceptions");
const date_util_1 = require("../../../../libs/utils/date-util");
const common_1 = require("@nestjs/common");
const innopay_api_types_1 = require("../sdk/innopay-api.types");
const innopay_cash_in_sdk_service_1 = require("../sdk/services/innopay-cash-in-sdk.service");
const innopay_status_sdk_service_1 = require("../sdk/services/innopay-status-sdk.service");
const constants_1 = require("../types/constants");
let InnopayCashInService = class InnopayCashInService {
    constructor(innopayCashInSdkService, innopayStatusSdkService) {
        this.innopayCashInSdkService = innopayCashInSdkService;
        this.innopayStatusSdkService = innopayStatusSdkService;
    }
    async paySavedCard(props) {
        const startTransactionResult = await this.innopayCashInSdkService.pay(props);
        if (!startTransactionResult.success || !startTransactionResult.customerReference) {
            throw new common_1.BadGatewayException(startTransactionResult.errorDescription);
        }
        const transactionInfo = await this.innopayStatusSdkService.getTransactionStatusCode({
            referenceNr: startTransactionResult.customerReference,
        });
        if (![...constants_1.InnopayCashInReadyToCompleteStatus, ...constants_1.InnopayCashInSuccessStatus].includes(transactionInfo.transactionStatus)) {
            return { payResult: false, customerReference: startTransactionResult.customerReference };
        }
        let payResult = true;
        if (constants_1.InnopayCashInReadyToCompleteStatus.includes(transactionInfo.transactionStatus)) {
            payResult = await this.innopayCashInSdkService.completePayment({
                customerReference: startTransactionResult.customerReference,
                transactionSuccess: true,
            });
        }
        const completedTransactionInfo = await this.innopayStatusSdkService.getTransactionStatusCode({
            referenceNr: startTransactionResult.customerReference,
        });
        if (!constants_1.InnopayCashInSuccessStatus.includes(completedTransactionInfo.transactionStatus)) {
            return { payResult: false, customerReference: startTransactionResult.customerReference };
        }
        return {
            payResult,
            customerReference: startTransactionResult.customerReference,
        };
    }
    async startCashInFromNewCard(props) {
        const startTransactionResult = await this.innopayCashInSdkService.startTransaction({
            ...props,
            merchantLocalDateTime: date_util_1.DateUtil.utcNow().format(innopay_api_types_1.InnopayDateTimeFormat).toString(),
        });
        if (!startTransactionResult.success ||
            !startTransactionResult.customerReference ||
            !startTransactionResult.redirectURL) {
            throw new common_1.BadGatewayException(startTransactionResult.errorDescription);
        }
        return {
            customerReference: startTransactionResult.customerReference,
            redirectURL: startTransactionResult.redirectURL,
        };
    }
    async endCashInFromNewCard(props) {
        if (props.overrideAmount && props.overrideAmount < 0) {
            throw new exceptions_1.ArgumentOutOfRangeException('Override amount must be positive number');
        }
        const transactionInfo = await this.innopayStatusSdkService.getTransactionStatusCode({
            referenceNr: props.customerReference,
        });
        if (!constants_1.InnopayCashInReadyToCompleteStatus.includes(transactionInfo.transactionStatus)) {
            throw new common_1.BadGatewayException(`Innopay transaction status = ${transactionInfo.transactionStatus}`);
        }
        await this.innopayCashInSdkService.completeTransaction({
            referenceNr: props.customerReference,
            transactionSuccess: props.transactionSuccess,
            overrideAmount: props.overrideAmount,
        });
        const completedTransactionInfo = await this.innopayStatusSdkService.getTransactionStatusCode({
            referenceNr: props.customerReference,
        });
        return constants_1.InnopayCashInSuccessStatus.includes(completedTransactionInfo.transactionStatus);
    }
    async cancelECommTransaction(customerReference) {
        const transactionInfo = await this.innopayStatusSdkService.getTransactionStatusCode({
            referenceNr: customerReference,
        });
        if (!constants_1.InnopayCashInReadyToCompleteStatus.includes(transactionInfo.transactionStatus)) {
            throw new common_1.BadGatewayException(`Innopay transaction status = ${transactionInfo.transactionStatus}`);
        }
        const result = await this.innopayCashInSdkService.completeTransaction({
            referenceNr: customerReference,
            transactionSuccess: false,
        });
        const completedTransactionInfo = await this.innopayStatusSdkService.getTransactionStatusCode({
            referenceNr: customerReference,
        });
        if (!constants_1.InnopayCashInCanceledStatus.includes(completedTransactionInfo.transactionStatus)) {
            throw new common_1.BadGatewayException(`Innopay transaction status = ${completedTransactionInfo.transactionStatus}`);
        }
        return result;
    }
};
InnopayCashInService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [innopay_cash_in_sdk_service_1.InnopayCashInSdkService,
        innopay_status_sdk_service_1.InnopayStatusSdkService])
], InnopayCashInService);
exports.InnopayCashInService = InnopayCashInService;
//# sourceMappingURL=innopay-cash-in.service.js.map