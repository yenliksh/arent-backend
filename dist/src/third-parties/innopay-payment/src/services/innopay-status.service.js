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
exports.InnopayStatusService = exports.InnopayTransactionState = void 0;
const common_1 = require("@nestjs/common");
const innopay_status_sdk_service_1 = require("../sdk/services/innopay-status-sdk.service");
const constants_1 = require("../types/constants");
var InnopayTransactionState;
(function (InnopayTransactionState) {
    InnopayTransactionState["FAILED"] = "FAILED";
    InnopayTransactionState["IN_PROGRESS"] = "IN_PROGRESS";
    InnopayTransactionState["READY_TO_COMPLETE"] = "READY_TO_COMPLETE";
    InnopayTransactionState["SUCCESS"] = "SUCCESS";
})(InnopayTransactionState = exports.InnopayTransactionState || (exports.InnopayTransactionState = {}));
let InnopayStatusService = class InnopayStatusService {
    constructor(innopayStatusSdkService) {
        this.innopayStatusSdkService = innopayStatusSdkService;
    }
    async getCashInTransactionInfo(customerReference) {
        const checkCardResponseType = (obj) => {
            return (obj === null || obj === void 0 ? void 0 : obj.userId) !== undefined && (obj === null || obj === void 0 ? void 0 : obj.cardId) !== undefined;
        };
        const transactionInfo = await this.innopayStatusSdkService.getTransactionStatusCode({
            referenceNr: customerReference,
        });
        const status = transactionInfo.transactionStatus;
        const cardInfo = {
            cardId: transactionInfo.additionalInformation.CARD_ID,
            userId: transactionInfo.additionalInformation.USER_ID,
        };
        let transactionState = InnopayTransactionState.IN_PROGRESS;
        if (constants_1.InnopayCashInSuccessStatus.includes(status)) {
            transactionState = InnopayTransactionState.SUCCESS;
        }
        if (constants_1.InnopayCashInReadyToCompleteStatus.includes(status)) {
            transactionState = InnopayTransactionState.READY_TO_COMPLETE;
        }
        if (constants_1.InnopayCashInFailedStatus.includes(status)) {
            transactionState = InnopayTransactionState.FAILED;
        }
        return {
            transactionState,
            cardInfo: checkCardResponseType(cardInfo) ? cardInfo : undefined,
        };
    }
};
InnopayStatusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [innopay_status_sdk_service_1.InnopayStatusSdkService])
], InnopayStatusService);
exports.InnopayStatusService = InnopayStatusService;
//# sourceMappingURL=innopay-status.service.js.map