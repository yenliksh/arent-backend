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
exports.UpdateContractPaymentTransactionHandler = void 0;
const contract_orm_mapper_1 = require("../../../../domain-repositories/contract/contract.orm-mapper");
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const payment_transaction_repository_1 = require("../../../../domain-repositories/payment-transaction/payment-transaction.repository");
const contract_entity_1 = require("../../domain/entities/contract.entity");
const unit_of_work_1 = require("../../../../../infrastructure/database/unit-of-work/unit-of-work");
const pub_sub_service_1 = require("../../../../../modules/graphql-subscriptions/pub-sub.service");
const types_1 = require("../../../../../modules/graphql-subscriptions/types");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const update_contract_payment_transaction_command_1 = require("./update-contract-payment-transaction.command");
let UpdateContractPaymentTransactionHandler = class UpdateContractPaymentTransactionHandler {
    constructor(contractRepository, paymentTransactionRepository, pubSubService, unitOfWork) {
        this.contractRepository = contractRepository;
        this.paymentTransactionRepository = paymentTransactionRepository;
        this.pubSubService = pubSubService;
        this.unitOfWork = unitOfWork;
    }
    async execute(command) {
        const { contractId, trxId: incommingTrxId } = command;
        const [trxId, isOwnTrx] = incommingTrxId ? [incommingTrxId, false] : [await this.unitOfWork.start(), true];
        try {
            const contract = await this.contractRepository.findOneById(contractId.value, trxId);
            if (!contract) {
                throw new common_1.NotFoundException('Contract not found');
            }
            const paymentTransaction = await this.paymentTransactionRepository.findNextCashIn(contractId.value, trxId);
            contract.setNextPaymentTransactionId(paymentTransaction === null || paymentTransaction === void 0 ? void 0 : paymentTransaction.id);
            await this.contractRepository.save(contract, trxId);
            if (isOwnTrx) {
                await this.unitOfWork.execute(trxId);
            }
            this.publishContract(contract);
        }
        catch (error) {
            if (isOwnTrx) {
                await this.unitOfWork.rollback(trxId);
            }
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
UpdateContractPaymentTransactionHandler = __decorate([
    (0, cqrs_1.CommandHandler)(update_contract_payment_transaction_command_1.UpdateContractPaymentTransactionCommand),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository,
        payment_transaction_repository_1.PaymentTransactionRepository,
        pub_sub_service_1.PubSubService,
        unit_of_work_1.UnitOfWork])
], UpdateContractPaymentTransactionHandler);
exports.UpdateContractPaymentTransactionHandler = UpdateContractPaymentTransactionHandler;
//# sourceMappingURL=update-contract-payment-transaction.handler.js.map