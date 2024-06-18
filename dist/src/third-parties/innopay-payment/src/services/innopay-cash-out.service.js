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
exports.InnopayCashOutService = void 0;
const date_util_1 = require("../../../../libs/utils/date-util");
const common_1 = require("@nestjs/common");
const innopay_api_types_1 = require("../sdk/innopay-api.types");
const innopay_cash_out_sdk_service_1 = require("../sdk/services/innopay-cash-out-sdk.service");
const innopay_status_sdk_service_1 = require("../sdk/services/innopay-status-sdk.service");
let InnopayCashOutService = class InnopayCashOutService {
    constructor(innopayCashOutSdkService, innopayStatusSdkService) {
        this.innopayCashOutSdkService = innopayCashOutSdkService;
        this.innopayStatusSdkService = innopayStatusSdkService;
    }
    async startCashOut(props) {
        const checkResponseType = (obj) => {
            return (obj === null || obj === void 0 ? void 0 : obj.customerReference) !== undefined;
        };
        const startTransactionResult = await this.innopayCashOutSdkService.startCashOutToRegisteredCard({
            additionalInformationList: {
                RECEIVER_CARD_ID: props.RECEIVER_CARD_ID,
                RECEIVER_USER_ID: props.RECEIVER_USER_ID,
                USER_LOGIN: props.USER_LOGIN,
                CARD_ID: props.CARD_ID,
                USER_ID: props.USER_ID,
            },
            merchantLocalDateTime: date_util_1.DateUtil.utcNow().format(innopay_api_types_1.InnopayDateTimeFormat).toString(),
            senderName: props.senderName,
            tranAmount: props.tranAmount,
        });
        if (!checkResponseType(startTransactionResult)) {
            throw new common_1.BadGatewayException(startTransactionResult.errorDescription);
        }
        const paymentStatus = await this.innopayStatusSdkService.getCashOutTransactionStatus({
            referenceNr: startTransactionResult.customerReference,
        });
        if (paymentStatus.transactionStatus !== innopay_api_types_1.CashOutTransactionStatus.PENDING_APPROVEMENT) {
            return { success: false, сashOutResult: startTransactionResult };
        }
        return { success: true, сashOutResult: startTransactionResult };
    }
    async endCashOut(referenceNr, success) {
        const paymentStatusBeforeComplete = await this.innopayStatusSdkService.getCashOutTransactionStatus({
            referenceNr,
        });
        if (paymentStatusBeforeComplete.transactionStatus !== innopay_api_types_1.CashOutTransactionStatus.PENDING_APPROVEMENT) {
            return { success: false, customerReference: referenceNr, status: paymentStatusBeforeComplete.transactionStatus };
        }
        await this.innopayCashOutSdkService.completeCashOutTransaction({
            referenceNr,
            transactionSuccess: success,
        });
        const paymentStatusAfterComplete = await this.innopayStatusSdkService.getCashOutTransactionStatus({
            referenceNr,
        });
        const isSuccess = (success && paymentStatusAfterComplete.transactionStatus === innopay_api_types_1.CashOutTransactionStatus.PROCESSED) ||
            (!success && paymentStatusAfterComplete.transactionStatus === innopay_api_types_1.CashOutTransactionStatus.DECLINED);
        return {
            success: isSuccess,
            customerReference: referenceNr,
            status: paymentStatusAfterComplete.transactionStatus,
        };
    }
};
InnopayCashOutService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [innopay_cash_out_sdk_service_1.InnopayCashOutSdkService,
        innopay_status_sdk_service_1.InnopayStatusSdkService])
], InnopayCashOutService);
exports.InnopayCashOutService = InnopayCashOutService;
//# sourceMappingURL=innopay-cash-out.service.js.map