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
exports.CompleteCashOutProcessor = void 0;
const sleep_1 = require("../../../../../libs/utils/sleep");
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const Sentry = require("@sentry/node");
const innopay_cash_out_service_1 = require("../../../../../third-parties/innopay-payment/src/services/innopay-cash-out.service");
const constants_1 = require("../../../../../third-parties/innopay-payment/src/types/constants");
const complete_cash_out_innopay_transaction_producer_1 = require("../sqs-producers/complete-cash-out-innopay-transaction.producer");
const types_1 = require("../types");
let CompleteCashOutProcessor = class CompleteCashOutProcessor {
    constructor(sqsProducer, innopayCashOutService) {
        this.sqsProducer = sqsProducer;
        this.innopayCashOutService = innopayCashOutService;
    }
    async handle(job) {
        const { customerReference, success, iteration = 0 } = job.data;
        try {
            const completeResult = await this.innopayCashOutService.endCashOut(customerReference, success);
            if (!completeResult.success) {
                if (completeResult.status && constants_1.InnopayCashOutFinalStatus.includes(completeResult.status)) {
                    const errorMessage = `Customer reference ${completeResult.customerReference} already has final status ${completeResult.status}`;
                    common_1.Logger.error(errorMessage);
                    Sentry.captureException(errorMessage);
                    await (0, sleep_1.sleep)(1000);
                    return;
                }
                throw new Error('Cash out transaction not completed');
            }
        }
        catch (error) {
            this.sqsProducer.send({ customerReference, success, iteration });
        }
        await (0, sleep_1.sleep)(1000);
    }
};
__decorate([
    (0, bull_1.Process)(types_1.InnopayTransactionProcess.COMPLETE_CASH_OUT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompleteCashOutProcessor.prototype, "handle", null);
CompleteCashOutProcessor = __decorate([
    (0, bull_1.Processor)(types_1.InnopayBulls.INNOPAY_TRANSACTION),
    __metadata("design:paramtypes", [complete_cash_out_innopay_transaction_producer_1.CompleteCashOutInnopayTransactionProducer,
        innopay_cash_out_service_1.InnopayCashOutService])
], CompleteCashOutProcessor);
exports.CompleteCashOutProcessor = CompleteCashOutProcessor;
//# sourceMappingURL=complete-cash-out.processor.js.map