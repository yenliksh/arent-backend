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
exports.CancelInnopayTransactionProcessor = void 0;
const reversing_innopay_transaction_repository_1 = require("../../../../domain-repositories/reversing-innopay-transaction/reversing-innopay-transaction.repository");
const sleep_1 = require("../../../../../libs/utils/sleep");
const bull_1 = require("@nestjs/bull");
const innopay_cash_in_service_1 = require("../../../../../third-parties/innopay-payment/src/services/innopay-cash-in.service");
const cancel_innopay_transaction_producer_1 = require("../sqs-producers/cancel-innopay-transaction.producer");
const types_1 = require("../types");
let CancelInnopayTransactionProcessor = class CancelInnopayTransactionProcessor {
    constructor(reversingInnopayTransactionRepository, sqsProducer, innopayCashInService) {
        this.reversingInnopayTransactionRepository = reversingInnopayTransactionRepository;
        this.sqsProducer = sqsProducer;
        this.innopayCashInService = innopayCashInService;
    }
    async handle(job) {
        const { customerReference, iteration = 0 } = job.data;
        try {
            const cancelResult = await this.innopayCashInService.cancelECommTransaction(customerReference);
            if (!cancelResult) {
                throw new Error('Transaction not canceled');
            }
            const reversingInnopayTransaction = await this.reversingInnopayTransactionRepository.findByCustomerReference(customerReference);
            if (reversingInnopayTransaction) {
                reversingInnopayTransaction.reverse();
                await this.reversingInnopayTransactionRepository.save(reversingInnopayTransaction);
            }
        }
        catch (error) {
            this.sqsProducer.send({ customerReference, iteration });
        }
        await (0, sleep_1.sleep)(1000);
    }
};
__decorate([
    (0, bull_1.Process)(types_1.InnopayTransactionProcess.CANCEL_INNOPAY_TRANSACTION),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CancelInnopayTransactionProcessor.prototype, "handle", null);
CancelInnopayTransactionProcessor = __decorate([
    (0, bull_1.Processor)(types_1.InnopayBulls.INNOPAY_TRANSACTION),
    __metadata("design:paramtypes", [reversing_innopay_transaction_repository_1.ReversingInnopayTransactionRepository,
        cancel_innopay_transaction_producer_1.CancelInnopayTransactionProducer,
        innopay_cash_in_service_1.InnopayCashInService])
], CancelInnopayTransactionProcessor);
exports.CancelInnopayTransactionProcessor = CancelInnopayTransactionProcessor;
//# sourceMappingURL=cancel-innopay-transaction.processor.js.map