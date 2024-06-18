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
exports.PaymentTransactionCashInProcessor = void 0;
const contract_orm_mapper_1 = require("../../../../domain-repositories/contract/contract.orm-mapper");
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const payment_transaction_orm_mapper_1 = require("../../../../domain-repositories/payment-transaction/payment-transaction.orm-mapper");
const payment_transaction_repository_1 = require("../../../../domain-repositories/payment-transaction/payment-transaction.repository");
const update_contract_payment_transaction_command_1 = require("../../../contract/commands/update-contract-payment-transaction/update-contract-payment-transaction.command");
const contract_entity_1 = require("../../../contract/domain/entities/contract.entity");
const reverse_innopay_transaction_command_1 = require("../../../innopay-transaction/commands/reverse-innopay-transaction/reverse-innopay-transaction.command");
const payment_transaction_entity_1 = require("../../domain/entities/payment-transaction.entity");
const events_1 = require("../../domain/events/events");
const types_1 = require("../../domain/types");
const payment_transaction_not_active_problem_1 = require("../../problems/payment-transaction-not-active.problem");
const unit_of_work_1 = require("../../../../../infrastructure/database/unit-of-work/unit-of-work");
const pub_sub_service_1 = require("../../../../../modules/graphql-subscriptions/pub-sub.service");
const types_2 = require("../../../../../modules/graphql-subscriptions/types");
const recurring_payment_last_withdraw_failure_event_1 = require("../../../../../modules/notifications/services/recurring-payment-last-withdraw-failure/recurring-payment-last-withdraw-failure.event");
const recurring_payment_withdraw_failure_event_1 = require("../../../../../modules/notifications/services/recurring-payment-withdraw-failure/recurring-payment-withdraw-failure.event");
const recurring_payment_withdraw_success_event_1 = require("../../../../../modules/notifications/services/recurring-payment-withdraw-success/recurring-payment-withdraw-success.event");
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cqrs_1 = require("@nestjs/cqrs");
const event_emitter_1 = require("@nestjs/event-emitter");
const innopay_cash_in_service_1 = require("../../../../../third-parties/innopay-payment/src/services/innopay-cash-in.service");
const types_3 = require("../types");
let PaymentTransactionCashInProcessor = class PaymentTransactionCashInProcessor {
    constructor(innopayCashInService, paymentTransactionRepository, contractRepository, pubSubService, eventEmitter, unitOfWork, commandBus, configService) {
        this.innopayCashInService = innopayCashInService;
        this.paymentTransactionRepository = paymentTransactionRepository;
        this.contractRepository = contractRepository;
        this.pubSubService = pubSubService;
        this.eventEmitter = eventEmitter;
        this.unitOfWork = unitOfWork;
        this.commandBus = commandBus;
        this.configService = configService;
    }
    async handle(job) {
        const { paymentTransactionId } = job.data;
        const isProduction = this.configService.get('nodeEnv') === 'production';
        const trxId = await this.unitOfWork.start();
        let customerReference;
        try {
            const [paymentTransaction, contract] = await Promise.all([
                this.paymentTransactionRepository.findOneById(paymentTransactionId, trxId),
                this.contractRepository.findOneByPaymentTransactionId(paymentTransactionId, trxId),
            ]);
            if (!paymentTransaction) {
                throw new common_1.NotFoundException('Payment transaction not found');
            }
            if (!contract) {
                throw new common_1.NotFoundException('Contract not found');
            }
            if (!paymentTransaction.isCashInActive()) {
                throw new payment_transaction_not_active_problem_1.PaymentTransactionNotActiveProblem();
            }
            const card = paymentTransaction.senderCardOrFail;
            let completeTransactionResult = false;
            const result = await this.innopayCashInService.paySavedCard({
                amount: isProduction ? paymentTransaction.totalAmountPayable : 999999,
                cardId: card.cnpCardId,
                userLogin: card.userId.value,
                userId: card.cnpUserId,
                paymentTarget: paymentTransaction.contractId.value,
            });
            if (!result.payResult) {
                await this.commandBus.execute(new reverse_innopay_transaction_command_1.ReverseInnopayTransactionCommand(result.customerReference));
                throw new common_1.BadGatewayException('Something went wrong');
            }
            customerReference = result.customerReference;
            completeTransactionResult = result.payResult;
            if (!customerReference) {
                throw new common_1.BadGatewayException('Customer reference exist');
            }
            if (completeTransactionResult) {
                paymentTransaction.cashInSuccess(card.cardMeta, { customerReference });
            }
            else {
                paymentTransaction.failure(types_1.PaymentInvoiceType.WITHDRAW, card.cardMeta, { customerReference });
            }
            contract.endPending();
            await Promise.all([
                this.paymentTransactionRepository.save(paymentTransaction, trxId),
                this.contractRepository.save(contract, trxId),
            ]);
            await this.unitOfWork.execute(trxId);
            if (paymentTransaction.isRecurring) {
                this.eventEmitter.emit(recurring_payment_withdraw_success_event_1.RecurringPaymentWithdrawSuccessEvent.eventName, recurring_payment_withdraw_success_event_1.RecurringPaymentWithdrawSuccessEvent.create({
                    recipientId: paymentTransaction.senderId,
                    contractId: paymentTransaction.contractId,
                    paymentTransactionId: paymentTransaction.id,
                }));
            }
            this.commandBus.execute(new update_contract_payment_transaction_command_1.UpdateContractPaymentTransactionCommand(paymentTransaction.contractId));
            this.publishPaymentTransaction(paymentTransaction);
            this.publishContract(contract);
        }
        catch (error) {
            await this.unitOfWork.rollback(trxId);
            const [paymentTransaction, contract] = await Promise.all([
                this.paymentTransactionRepository.findOneById(paymentTransactionId),
                this.contractRepository.findOneByPaymentTransactionId(paymentTransactionId),
            ]);
            if (paymentTransaction && contract && customerReference) {
                const card = paymentTransaction.senderCardOrFail;
                paymentTransaction.failure(types_1.PaymentInvoiceType.WITHDRAW, card.cardMeta, { customerReference }, JSON.stringify(error));
                contract.endPending();
                await Promise.all([
                    this.paymentTransactionRepository.save(paymentTransaction),
                    this.contractRepository.save(contract),
                ]);
                this.publishContract(contract);
                this.eventEmitter.emit(events_1.CashInFailedEvent.eventName, events_1.CashInFailedEvent.create({ paymentTransaction }));
                if (paymentTransaction.isRecurring) {
                    this.eventEmitter.emit(recurring_payment_withdraw_failure_event_1.RecurringPaymentWithdrawFailureEvent.eventName, recurring_payment_withdraw_failure_event_1.RecurringPaymentWithdrawFailureEvent.create({ recipientId: paymentTransaction.senderId }));
                }
                if (paymentTransaction.isLastPayment) {
                    this.eventEmitter.emit(recurring_payment_last_withdraw_failure_event_1.RecurringPaymentLastWithdrawFailureEvent.eventName, recurring_payment_last_withdraw_failure_event_1.RecurringPaymentLastWithdrawFailureEvent.create({
                        recipientId: paymentTransaction.recipientId,
                        contractId: paymentTransaction.contractId,
                    }));
                }
            }
            throw error;
        }
    }
    async publishPaymentTransaction(paymentTransaction) {
        const mapper = new payment_transaction_orm_mapper_1.PaymentTransactionOrmMapper(payment_transaction_entity_1.PaymentTransactionEntity);
        const ormPaymentTransaction = await mapper.toOrmEntity(paymentTransaction);
        this.pubSubService.publish(pub_sub_service_1.PubSubTrigger.UPDATE_PAYMENT_TRANSACTION, {
            paymentTransaction: ormPaymentTransaction,
            cardOwnerId: paymentTransaction.senderId.value,
            event: types_2.PaymentTransactionPubSubEvent.UPDATED,
        });
    }
    async publishContract(contract) {
        const mapper = new contract_orm_mapper_1.ContractOrmMapper(contract_entity_1.ContractEntity);
        const ormContract = await mapper.toOrmEntity(contract);
        this.pubSubService.publish(pub_sub_service_1.PubSubTrigger.UPDATE_CONTRACT, {
            contract: ormContract,
            event: types_2.ContractPubSubEvent.UPDATED,
        });
    }
};
__decorate([
    (0, bull_1.Process)(types_3.PaymentTransactionProcess.CASH_IN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentTransactionCashInProcessor.prototype, "handle", null);
PaymentTransactionCashInProcessor = __decorate([
    (0, bull_1.Processor)(types_3.PaymentBulls.PAYMENT_TRANSACTION),
    __metadata("design:paramtypes", [innopay_cash_in_service_1.InnopayCashInService,
        payment_transaction_repository_1.PaymentTransactionRepository,
        contract_repository_1.ContractRepository,
        pub_sub_service_1.PubSubService,
        event_emitter_1.EventEmitter2,
        unit_of_work_1.UnitOfWork,
        cqrs_1.CommandBus,
        config_1.ConfigService])
], PaymentTransactionCashInProcessor);
exports.PaymentTransactionCashInProcessor = PaymentTransactionCashInProcessor;
//# sourceMappingURL=transaction-cash-in.processor.js.map