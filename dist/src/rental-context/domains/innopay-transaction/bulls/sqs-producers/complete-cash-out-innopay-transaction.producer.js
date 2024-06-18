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
exports.CompleteCashOutInnopayTransactionProducer = void 0;
const constants_1 = require("../../../../../modules/aws/sqs/constants");
const sqs_service_1 = require("../../../../../modules/aws/sqs/sqs.service");
const common_1 = require("@nestjs/common");
let CompleteCashOutInnopayTransactionProducer = class CompleteCashOutInnopayTransactionProducer {
    constructor(sqsService) {
        this.sqsService = sqsService;
        this.queue = constants_1.SQSQueues.completeCashOutInnopayTransactionQueue;
    }
    async send(body) {
        var _a;
        const iteration = ((_a = body.iteration) !== null && _a !== void 0 ? _a : 0) + 1;
        return this.sqsService.sendMessage({
            body: { ...body, iteration },
            queueUrl: this.queue.url,
        });
    }
};
CompleteCashOutInnopayTransactionProducer = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sqs_service_1.SQSService])
], CompleteCashOutInnopayTransactionProducer);
exports.CompleteCashOutInnopayTransactionProducer = CompleteCashOutInnopayTransactionProducer;
//# sourceMappingURL=complete-cash-out-innopay-transaction.producer.js.map