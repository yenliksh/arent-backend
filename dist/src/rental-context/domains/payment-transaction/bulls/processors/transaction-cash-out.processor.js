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
exports.PaymentTransactionCashOutProcessor = void 0;
const contract_orm_mapper_1 = require("../../../../domain-repositories/contract/contract.orm-mapper");
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const payment_transaction_orm_mapper_1 = require("../../../../domain-repositories/payment-transaction/payment-transaction.orm-mapper");
const payment_transaction_repository_1 = require("../../../../domain-repositories/payment-transaction/payment-transaction.repository");
const contract_entity_1 = require("../../../contract/domain/entities/contract.entity");
const complete_cash_out_innopay_transaction_producer_1 = require("../../../innopay-transaction/bulls/sqs-producers/complete-cash-out-innopay-transaction.producer");
const payment_transaction_entity_1 = require("../../domain/entities/payment-transaction.entity");
const types_1 = require("../../domain/types");
const payment_transaction_not_active_problem_1 = require("../../problems/payment-transaction-not-active.problem");
const unit_of_work_1 = require("../../../../../infrastructure/database/unit-of-work/unit-of-work");
const innopay_service_bad_request_problem_1 = require("../../../../../infrastructure/problems/innopay-service-bad-request.problem");
const pub_sub_service_1 = require("../../../../../modules/graphql-subscriptions/pub-sub.service");
const types_2 = require("../../../../../modules/graphql-subscriptions/types");
const payment_transfer_failure_event_1 = require("../../../../../modules/notifications/services/payment-transfer-failure/payment-transfer-failure.event");
const payment_transfer_success_event_1 = require("../../../../../modules/notifications/services/payment-transfer-success/payment-transfer-success.event");
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const innopay_cash_out_service_1 = require("../../../../../third-parties/innopay-payment/src/services/innopay-cash-out.service");
const constants_1 = require("../../../../constants");
const types_3 = require("../types");
let PaymentTransactionCashOutProcessor = class PaymentTransactionCashOutProcessor {
    constructor(innopayCashOutService, paymentTransactionRepository, contractRepository, completeCashOutInnopayTransactionProducer, unitOfWork, configService, eventEmitter, pubSubService) {
        this.innopayCashOutService = innopayCashOutService;
        this.paymentTransactionRepository = paymentTransactionRepository;
        this.contractRepository = contractRepository;
        this.completeCashOutInnopayTransactionProducer = completeCashOutInnopayTransactionProducer;
        this.unitOfWork = unitOfWork;
        this.configService = configService;
        this.eventEmitter = eventEmitter;
        this.pubSubService = pubSubService;
        this.isProduction = this.configService.get('nodeEnv') === 'production';
    }
    async handle(job) {
        const { paymentTransactionId } = job.data;
        const trxId = await this.unitOfWork.start();
        let landlordCustomerReference;
        let livinCustomerReference;
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
            if (!paymentTransaction.isCashOutActive()) {
                throw new payment_transaction_not_active_problem_1.PaymentTransactionNotActiveProblem();
            }
            const card = paymentTransaction.recipientCardOrFail;
            const { success, customerReference: landlordCustomerReference } = await this.startCashOut(paymentTransaction, card);
            try {
                if (!success) {
                    await this.endCashOut([landlordCustomerReference], false);
                    throw new innopay_service_bad_request_problem_1.InnopayServiceBadRequestProblem();
                }
                const cashOutResult = await this.endCashOut([landlordCustomerReference], true);
                if (!cashOutResult) {
                    throw new innopay_service_bad_request_problem_1.InnopayServiceBadRequestProblem();
                }
                paymentTransaction.cashOutSuccess(card.cardMeta, {
                    customerReference: landlordCustomerReference,
                    livinCustomerReference,
                });
            }
            catch (error) {
                paymentTransaction.failure(types_1.PaymentInvoiceType.RECEIVING, card.cardMeta, {
                    customerReference: landlordCustomerReference,
                    livinCustomerReference,
                });
            }
            contract.endPending();
            await Promise.all([
                this.paymentTransactionRepository.save(paymentTransaction, trxId),
                this.contractRepository.save(contract, trxId),
            ]);
            await this.unitOfWork.execute(trxId);
            this.publishPaymentTransaction(paymentTransaction);
            this.publishContract(contract);
            this.eventEmitter.emit(payment_transfer_success_event_1.PaymentTransferSuccessEvent.eventName, payment_transfer_success_event_1.PaymentTransferSuccessEvent.create({ recipientId: paymentTransaction.recipientId }));
        }
        catch (error) {
            await this.unitOfWork.rollback(trxId);
            const [paymentTransaction, contract] = await Promise.all([
                this.paymentTransactionRepository.findOneById(paymentTransactionId),
                this.contractRepository.findOneByPaymentTransactionId(paymentTransactionId),
            ]);
            if (paymentTransaction && contract && landlordCustomerReference) {
                const card = paymentTransaction.recipientCardOrFail;
                paymentTransaction.failure(types_1.PaymentInvoiceType.RECEIVING, card.cardMeta, { customerReference: landlordCustomerReference, livinCustomerReference }, JSON.stringify(error));
                contract.endPending();
                await Promise.all([
                    this.paymentTransactionRepository.save(paymentTransaction),
                    this.contractRepository.save(contract),
                ]);
                this.publishContract(contract);
                this.eventEmitter.emit(payment_transfer_failure_event_1.PaymentTransferFailureEvent.eventName, payment_transfer_failure_event_1.PaymentTransferFailureEvent.create({ recipientId: paymentTransaction.recipientId }));
            }
            throw error;
        }
    }
    async startCashOut(paymentTransaction, card) {
        const result = await Promise.all([
            this.innopayCashOutService.startCashOut({
                RECEIVER_CARD_ID: card.cnpCardId,
                RECEIVER_USER_ID: card.cnpUserId,
                USER_LOGIN: this.configService.get('payment.livin.subaccount.userLogin'),
                CARD_ID: this.configService.get('payment.livin.subaccount.cardId'),
                USER_ID: this.configService.get('payment.livin.subaccount.userId'),
                senderName: constants_1.PAYMENT_LIVIN_SENDER_NAME,
                tranAmount: this.isProduction ? paymentTransaction.totalAmountToBeTransferred : 333333,
            }),
        ]);
        return {
            success: result.every((cashOutResult) => cashOutResult === null || cashOutResult === void 0 ? void 0 : cashOutResult.success),
            customerReference: result[0].сashOutResult.customerReference,
        };
    }
    async endCashOut(customerReferences, success) {
        const result = await Promise.all(customerReferences.map((customerReferences) => this.innopayCashOutService.endCashOut(customerReferences, success)));
        const failedTransactions = result.flatMap((result) => {
            if (result.success) {
                return [];
            }
            return result.customerReference;
        });
        const isSuccess = !failedTransactions.length;
        if (!isSuccess) {
            failedTransactions.forEach((customerReference) => this.completeCashOutInnopayTransactionProducer.send({ customerReference, success, iteration: 0 }));
        }
        return isSuccess;
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
    (0, bull_1.Process)(types_3.PaymentTransactionProcess.CASH_OUT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentTransactionCashOutProcessor.prototype, "handle", null);
PaymentTransactionCashOutProcessor = __decorate([
    (0, bull_1.Processor)(types_3.PaymentBulls.PAYMENT_TRANSACTION),
    __metadata("design:paramtypes", [innopay_cash_out_service_1.InnopayCashOutService,
        payment_transaction_repository_1.PaymentTransactionRepository,
        contract_repository_1.ContractRepository,
        complete_cash_out_innopay_transaction_producer_1.CompleteCashOutInnopayTransactionProducer,
        unit_of_work_1.UnitOfWork,
        config_1.ConfigService,
        event_emitter_1.EventEmitter2,
        pub_sub_service_1.PubSubService])
], PaymentTransactionCashOutProcessor);
exports.PaymentTransactionCashOutProcessor = PaymentTransactionCashOutProcessor;
//# sourceMappingURL=transaction-cash-out.processor.js.map