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
exports.SQSService = void 0;
const common_1 = require("@nestjs/common");
const src_1 = require("../../../third-parties/simple-queue/src");
let SQSService = class SQSService {
    constructor(sqsClient) {
        this.sqsClient = sqsClient;
    }
    async sendMessage(params) {
        const { body, queueUrl } = params;
        const result = await this.sqsClient.client
            .sendMessage({ MessageBody: JSON.stringify(body), QueueUrl: queueUrl, MessageGroupId: 'default' })
            .promise();
        return result.MessageId;
    }
    async deleteMessage(params) {
        const { queueUrl, receiptHandle } = params;
        const result = await this.sqsClient.client
            .deleteMessage({ QueueUrl: queueUrl, ReceiptHandle: receiptHandle })
            .promise();
        return result;
    }
};
SQSService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [src_1.SQSClient])
], SQSService);
exports.SQSService = SQSService;
//# sourceMappingURL=sqs.service.js.map