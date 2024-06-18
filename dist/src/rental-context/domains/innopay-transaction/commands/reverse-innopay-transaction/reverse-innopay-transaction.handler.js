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
exports.ReverseInnopayTransactionHandler = void 0;
const reversing_innopay_transaction_repository_1 = require("../../../../domain-repositories/reversing-innopay-transaction/reversing-innopay-transaction.repository");
const cancel_innopay_transaction_producer_1 = require("../../bulls/sqs-producers/cancel-innopay-transaction.producer");
const reversing_innopay_transaction_entity_1 = require("../../domain/entities/reversing-innopay-transaction.entity");
const cqrs_1 = require("@nestjs/cqrs");
const reverse_innopay_transaction_command_1 = require("./reverse-innopay-transaction.command");
let ReverseInnopayTransactionHandler = class ReverseInnopayTransactionHandler {
    constructor(reversingInnopayTransactionRepository, sqsProducer) {
        this.reversingInnopayTransactionRepository = reversingInnopayTransactionRepository;
        this.sqsProducer = sqsProducer;
    }
    async execute(command) {
        const { customerReference } = command;
        const reversingInnopayTransaction = reversing_innopay_transaction_entity_1.ReversingInnopayTransactionEntity.create({ customerReference });
        await this.reversingInnopayTransactionRepository.save(reversingInnopayTransaction);
        this.sqsProducer.send({ customerReference, iteration: 0 });
    }
};
ReverseInnopayTransactionHandler = __decorate([
    (0, cqrs_1.CommandHandler)(reverse_innopay_transaction_command_1.ReverseInnopayTransactionCommand),
    __metadata("design:paramtypes", [reversing_innopay_transaction_repository_1.ReversingInnopayTransactionRepository,
        cancel_innopay_transaction_producer_1.CancelInnopayTransactionProducer])
], ReverseInnopayTransactionHandler);
exports.ReverseInnopayTransactionHandler = ReverseInnopayTransactionHandler;
//# sourceMappingURL=reverse-innopay-transaction.handler.js.map