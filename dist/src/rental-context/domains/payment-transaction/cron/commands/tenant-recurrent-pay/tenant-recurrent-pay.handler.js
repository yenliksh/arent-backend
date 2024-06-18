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
exports.TenantRecurrentPayHandler = void 0;
const contract_orm_mapper_1 = require("../../../../../domain-repositories/contract/contract.orm-mapper");
const contract_repository_1 = require("../../../../../domain-repositories/contract/contract.repository");
const payment_transaction_repository_1 = require("../../../../../domain-repositories/payment-transaction/payment-transaction.repository");
const contract_entity_1 = require("../../../../contract/domain/entities/contract.entity");
const payment_queue_1 = require("../../../bulls/queue/payment.queue");
const unit_of_work_1 = require("../../../../../../infrastructure/database/unit-of-work/unit-of-work");
const pub_sub_service_1 = require("../../../../../../modules/graphql-subscriptions/pub-sub.service");
const types_1 = require("../../../../../../modules/graphql-subscriptions/types");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const tenant_recurrent_pay_command_1 = require("./tenant-recurrent-pay.command");
let TenantRecurrentPayHandler = class TenantRecurrentPayHandler {
    constructor(paymentQueue, contractRepository, paymentTransactionRepository, pubSubService, unitOfWork) {
        this.paymentQueue = paymentQueue;
        this.contractRepository = contractRepository;
        this.paymentTransactionRepository = paymentTransactionRepository;
        this.pubSubService = pubSubService;
        this.unitOfWork = unitOfWork;
    }
    async execute() {
        const trxId = await this.unitOfWork.start();
        try {
            const actualTransactionIds = await this.paymentTransactionRepository.findActualCashInWaitingIds(trxId);
            const contracts = await this.contractRepository.findManyByPaymentTransactionIds(actualTransactionIds.map((i) => i.value), trxId);
            await Promise.all(contracts.map((contract) => {
                contract.setPending();
                return this.contractRepository.save(contract, trxId);
            }));
            await this.unitOfWork.execute(trxId);
            contracts.forEach((contract) => this.publishContract(contract));
            actualTransactionIds.map((id) => this.paymentQueue.addCashInJob({ paymentTransactionId: id.value }));
            return (0, oxide_ts_1.Ok)(true);
        }
        catch (error) {
            await this.unitOfWork.rollback(trxId);
            throw error;
        }
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
TenantRecurrentPayHandler = __decorate([
    (0, cqrs_1.CommandHandler)(tenant_recurrent_pay_command_1.TenantRecurrentPayCommand),
    __metadata("design:paramtypes", [payment_queue_1.PaymentQueue,
        contract_repository_1.ContractRepository,
        payment_transaction_repository_1.PaymentTransactionRepository,
        pub_sub_service_1.PubSubService,
        unit_of_work_1.UnitOfWork])
], TenantRecurrentPayHandler);
exports.TenantRecurrentPayHandler = TenantRecurrentPayHandler;
//# sourceMappingURL=tenant-recurrent-pay.handler.js.map