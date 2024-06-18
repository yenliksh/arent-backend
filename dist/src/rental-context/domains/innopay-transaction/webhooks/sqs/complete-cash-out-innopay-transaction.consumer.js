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
exports.CompleteCashOutInnopayTransactionConsumer = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
const constants_1 = require("../../../../../modules/aws/sqs/constants");
const common_1 = require("@nestjs/common");
const Sentry = require("@sentry/node");
const nestjs_sqs_1 = require("@ssut/nestjs-sqs");
const innopay_transaction_bulls_queue_1 = require("../../bulls/innopay-transaction-bulls.queue");
let CompleteCashOutInnopayTransactionConsumer = class CompleteCashOutInnopayTransactionConsumer {
    constructor(innopayTransactionBullsQueue) {
        this.innopayTransactionBullsQueue = innopayTransactionBullsQueue;
    }
    async handle(queueMessage) {
        const isSqsMessageTypeValid = (obj) => {
            return ((obj === null || obj === void 0 ? void 0 : obj.customerReference) !== undefined &&
                (obj === null || obj === void 0 ? void 0 : obj.success) !== undefined);
        };
        const body = queueMessage.Body ? JSON.parse(queueMessage.Body) : undefined;
        if (!isSqsMessageTypeValid(body)) {
            Sentry.captureException(`Invalid sqs message type for cancel innopay transaction. Body: ${body}`);
            throw new exceptions_1.ArgumentInvalidException(`Invalid sqs message type for cancel innopay transaction`);
        }
        this.innopayTransactionBullsQueue.adCompleteCashOutJob(body);
    }
};
__decorate([
    (0, nestjs_sqs_1.SqsMessageHandler)(constants_1.SQSQueues.completeCashOutInnopayTransactionQueue.name, false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompleteCashOutInnopayTransactionConsumer.prototype, "handle", null);
CompleteCashOutInnopayTransactionConsumer = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [innopay_transaction_bulls_queue_1.InnopayTransactionBullsQueue])
], CompleteCashOutInnopayTransactionConsumer);
exports.CompleteCashOutInnopayTransactionConsumer = CompleteCashOutInnopayTransactionConsumer;
//# sourceMappingURL=complete-cash-out-innopay-transaction.consumer.js.map