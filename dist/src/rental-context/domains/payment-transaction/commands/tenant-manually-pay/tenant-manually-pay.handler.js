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
exports.TenantManuallyPayHandler = void 0;
const contract_orm_mapper_1 = require("../../../../domain-repositories/contract/contract.orm-mapper");
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const payment_transaction_repository_1 = require("../../../../domain-repositories/payment-transaction/payment-transaction.repository");
const contract_entity_1 = require("../../../contract/domain/entities/contract.entity");
const payment_queue_1 = require("../../bulls/queue/payment.queue");
const exceptions_1 = require("../../../../../libs/exceptions");
const pub_sub_service_1 = require("../../../../../modules/graphql-subscriptions/pub-sub.service");
const types_1 = require("../../../../../modules/graphql-subscriptions/types");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const tenant_manually_pay_command_1 = require("./tenant-manually-pay.command");
let TenantManuallyPayHandler = class TenantManuallyPayHandler {
    constructor(paymentQueue, paymentTransactionRepository, contractRepository, pubSubService) {
        this.paymentQueue = paymentQueue;
        this.paymentTransactionRepository = paymentTransactionRepository;
        this.contractRepository = contractRepository;
        this.pubSubService = pubSubService;
    }
    async execute(command) {
        const { paymentTransactionId, userId } = command;
        const [paymentTransaction, contract] = await Promise.all([
            this.paymentTransactionRepository.findOneById(paymentTransactionId.value),
            this.contractRepository.findOneByPaymentTransactionId(paymentTransactionId.value),
        ]);
        if (!paymentTransaction) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Payment transaction not found'));
        }
        if (!contract) {
            throw new common_1.NotFoundException('Contract not found');
        }
        if (!paymentTransaction.isReadyToSelfPayNow(userId)) {
            return (0, oxide_ts_1.Err)(new exceptions_1.ArgumentInvalidException('Payment is not ready to manually pay now'));
        }
        contract.setPending();
        await this.contractRepository.save(contract);
        this.publishContract(contract);
        this.paymentQueue.addCashInJob({ paymentTransactionId: paymentTransactionId.value });
        return (0, oxide_ts_1.Ok)(paymentTransaction.id);
    }
    async publishContract(contract) {
        const mapper = new contract_orm_mapper_1.ContractOrmMapper(contract_entity_1.ContractEntity);
        const ormContract = await mapper.toOrmEntity(contract);
        this.pubSubService.publish(pub_sub_service_1.PubSubTrigger.UPDATE_CONTRACT, {
            contract: ormContract,
            event: types_1.ContractPubSubEvent.UPDATED,
        });
    }
};
TenantManuallyPayHandler = __decorate([
    (0, cqrs_1.CommandHandler)(tenant_manually_pay_command_1.TenantManuallyPayCommand),
    __metadata("design:paramtypes", [payment_queue_1.PaymentQueue,
        payment_transaction_repository_1.PaymentTransactionRepository,
        contract_repository_1.ContractRepository,
        pub_sub_service_1.PubSubService])
], TenantManuallyPayHandler);
exports.TenantManuallyPayHandler = TenantManuallyPayHandler;
//# sourceMappingURL=tenant-manually-pay.handler.js.map