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
exports.PaymentTransactionCancelProcessor = void 0;
const contract_orm_mapper_1 = require("../../../../domain-repositories/contract/contract.orm-mapper");
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const payment_transaction_orm_mapper_1 = require("../../../../domain-repositories/payment-transaction/payment-transaction.orm-mapper");
const payment_transaction_repository_1 = require("../../../../domain-repositories/payment-transaction/payment-transaction.repository");
const user_repository_1 = require("../../../../domain-repositories/user/user.repository");
const update_contract_payment_transaction_command_1 = require("../../../contract/commands/update-contract-payment-transaction/update-contract-payment-transaction.command");
const contract_entity_1 = require("../../../contract/domain/entities/contract.entity");
const complete_cash_out_innopay_transaction_producer_1 = require("../../../innopay-transaction/bulls/sqs-producers/complete-cash-out-innopay-transaction.producer");
const reverse_innopay_transaction_command_1 = require("../../../innopay-transaction/commands/reverse-innopay-transaction/reverse-innopay-transaction.command");
const payment_transaction_entity_1 = require("../../domain/entities/payment-transaction.entity");
const types_1 = require("../../domain/types");
const unit_of_work_1 = require("../../../../../infrastructure/database/unit-of-work/unit-of-work");
const enums_1 = require("../../../../../infrastructure/enums");
const innopay_service_bad_request_problem_1 = require("../../../../../infrastructure/problems/innopay-service-bad-request.problem");
const date_time_iso_tz_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/date-time-iso-tz.value-object");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const pub_sub_service_1 = require("../../../../../modules/graphql-subscriptions/pub-sub.service");
const types_2 = require("../../../../../modules/graphql-subscriptions/types");
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cqrs_1 = require("@nestjs/cqrs");
const Sentry = require("@sentry/node");
const innopay_cash_in_service_1 = require("../../../../../third-parties/innopay-payment/src/services/innopay-cash-in.service");
const innopay_cash_out_service_1 = require("../../../../../third-parties/innopay-payment/src/services/innopay-cash-out.service");
const constants_1 = require("../../../../constants");
const types_3 = require("../types");
let PaymentTransactionCancelProcessor = class PaymentTransactionCancelProcessor {
    constructor(innopayCashOutService, innopayCashInService, paymentTransactionRepository, contractRepository, userRepository, completeCashOutInnopayTransactionProducer, configService, unitOfWork, commandBus, pubSubService) {
        this.innopayCashOutService = innopayCashOutService;
        this.innopayCashInService = innopayCashInService;
        this.paymentTransactionRepository = paymentTransactionRepository;
        this.contractRepository = contractRepository;
        this.userRepository = userRepository;
        this.completeCashOutInnopayTransactionProducer = completeCashOutInnopayTransactionProducer;
        this.configService = configService;
        this.unitOfWork = unitOfWork;
        this.commandBus = commandBus;
        this.pubSubService = pubSubService;
        this.isProduction = this.configService.get('nodeEnv') === 'production';
    }
    async handle(job) {
        var _a;
        const { contractId, checkOutDate: inputCheckoutDate, adminCancelMeta, trigger } = job.data;
        const checkOutDate = inputCheckoutDate ? new date_time_iso_tz_value_object_1.DateTimeISOTZVO(inputCheckoutDate) : undefined;
        const trxId = await this.unitOfWork.start();
        const cashOutInfo = {};
        try {
            const contract = await this.contractRepository.findOneById(contractId, trxId);
            if (!contract) {
                throw new common_1.NotFoundException('Contract not found');
            }
            const paymentTransactions = await this.paymentTransactionRepository.findMany({ contractId: new uuid_value_object_1.UUID(contractId) }, trxId);
            if (!paymentTransactions.length) {
                throw new common_1.UnprocessableEntityException('Contract cannot exist without transactions');
            }
            const cancelationData = contract.cancel({ paymentTransactions, trigger, newCheckOutDate: checkOutDate }, adminCancelMeta);
            if (cancelationData.isFine) {
                const landlord = await this.userRepository.findOneById(contract.landlordIdOrFail.value, trxId);
                if (!landlord) {
                    throw new common_1.NotFoundException('Landlord not found');
                }
                landlord.fining();
                await this.userRepository.save(landlord, trxId);
            }
            if (cancelationData.recomputedLastStayTransaction) {
                await this.finishCancelation({
                    contract,
                    allPaymentTransactions: paymentTransactions,
                    updatingPaymentTransaction: cancelationData.recomputedLastStayTransaction,
                }, cancelationData.checkOutDate, trxId);
                await this.unitOfWork.commit(trxId);
                return;
            }
            const totalCancelationAmount = cancelationData.refundsAmountToSender +
                cancelationData.transferAmountToPlatform +
                cancelationData.transferAmountToRecipient +
                ((_a = cancelationData.withdrawalAmountFromSender) !== null && _a !== void 0 ? _a : 0);
            if (!totalCancelationAmount) {
                await this.finishCancelation({ contract, allPaymentTransactions: paymentTransactions }, cancelationData.checkOutDate, trxId);
                await this.unitOfWork.commit(trxId);
                return;
            }
            const senderCard = paymentTransactions[0].senderCardOrFail;
            const recipientCard = paymentTransactions[0].recipientCardOrFail;
            cashOutInfo.needRefundsToSender = !!cancelationData.refundsAmountToSender;
            cashOutInfo.needTransferToPlatform = !!cancelationData.transferAmountToPlatform;
            cashOutInfo.needTransferToRecipient = !!cancelationData.transferAmountToRecipient;
            cashOutInfo.needWithdrawalFromSender = !!cancelationData.withdrawalAmountFromSender;
            if (cashOutInfo.needWithdrawalFromSender && cancelationData.withdrawalAmountFromSender) {
                const { payResult, customerReference } = await this.innopayCashInService.paySavedCard({
                    amount: this.isProduction ? cancelationData.withdrawalAmountFromSender : 999999,
                    cardId: senderCard.cnpCardId,
                    userLogin: senderCard.userId.value,
                    userId: senderCard.cnpUserId,
                    paymentTarget: contractId,
                });
                if (!payResult) {
                    await this.commandBus.execute(new reverse_innopay_transaction_command_1.ReverseInnopayTransactionCommand(customerReference));
                    throw new common_1.BadGatewayException('Something went wrong');
                }
                cashOutInfo.withdrawalFromSenderSuccess = payResult;
                if (!cashOutInfo.withdrawalFromSenderSuccess) {
                    throw new innopay_service_bad_request_problem_1.InnopayServiceBadRequestProblem('Cannot withdrawal from sender');
                }
            }
            const startCashOutResult = await this.startCashOut(cashOutInfo, cancelationData, {
                recipient: recipientCard,
                sender: senderCard,
            });
            const activeCustomerReferences = startCashOutResult.customerReferences.flatMap((customerReference) => {
                if (!customerReference) {
                    return [];
                }
                return customerReference;
            });
            if (!startCashOutResult.success) {
                await this.endCashOut(activeCustomerReferences, false);
                throw new innopay_service_bad_request_problem_1.InnopayServiceBadRequestProblem();
            }
            const cashOutResult = await this.endCashOut(activeCustomerReferences, true);
            if (!cashOutResult) {
                throw new innopay_service_bad_request_problem_1.InnopayServiceBadRequestProblem();
            }
            await this.finishCancelation({ contract, allPaymentTransactions: paymentTransactions }, cancelationData.checkOutDate, trxId);
            await this.unitOfWork.commit(trxId);
        }
        catch (error) {
            await this.unitOfWork.rollback(trxId);
            const contract = await this.contractRepository.findOneById(contractId);
            if (contract) {
                contract.endPending();
                await this.contractRepository.save(contract);
                this.publishContract(contract);
            }
            common_1.Logger.error(error);
            Sentry.captureException(error);
            if (Object.keys(cashOutInfo).length) {
                common_1.Logger.warn(cashOutInfo);
                Sentry.captureException(cashOutInfo);
            }
            throw error;
        }
    }
    async startCashOut(cashOutInfo, cancelationData, cards) {
        const { recipient: recipientCard, sender: senderCard } = cards;
        const cancelationCashOutPaymentsPromises = [
            cashOutInfo.needRefundsToSender
                ? this.innopayCashOutService.startCashOut({
                    RECEIVER_CARD_ID: senderCard.cnpCardId,
                    RECEIVER_USER_ID: senderCard.cnpUserId,
                    USER_LOGIN: this.configService.get('payment.livin.subaccount.userLogin'),
                    CARD_ID: this.configService.get('payment.livin.subaccount.cardId'),
                    USER_ID: this.configService.get('payment.livin.subaccount.userId'),
                    senderName: constants_1.PAYMENT_LIVIN_SENDER_NAME,
                    tranAmount: this.isProduction ? cancelationData.refundsAmountToSender : 222222,
                })
                : undefined,
            cashOutInfo.needTransferToPlatform
                ? this.innopayCashOutService.startCashOut({
                    RECEIVER_CARD_ID: this.configService.get('payment.livin.withdrawal.cardId'),
                    RECEIVER_USER_ID: this.configService.get('payment.livin.withdrawal.userId'),
                    USER_LOGIN: this.configService.get('payment.livin.subaccount.userLogin'),
                    CARD_ID: this.configService.get('payment.livin.subaccount.cardId'),
                    USER_ID: this.configService.get('payment.livin.subaccount.userId'),
                    senderName: constants_1.PAYMENT_LIVIN_SENDER_NAME,
                    tranAmount: this.isProduction ? cancelationData.transferAmountToPlatform : 222222,
                })
                : undefined,
            cashOutInfo.needTransferToRecipient
                ? this.innopayCashOutService.startCashOut({
                    RECEIVER_CARD_ID: recipientCard.cnpCardId,
                    RECEIVER_USER_ID: recipientCard.cnpUserId,
                    USER_LOGIN: this.configService.get('payment.livin.subaccount.userLogin'),
                    CARD_ID: this.configService.get('payment.livin.subaccount.cardId'),
                    USER_ID: this.configService.get('payment.livin.subaccount.userId'),
                    senderName: constants_1.PAYMENT_LIVIN_SENDER_NAME,
                    tranAmount: this.isProduction ? cancelationData.transferAmountToRecipient : 444444,
                })
                : undefined,
        ];
        const cashOutResults = await Promise.all(cancelationCashOutPaymentsPromises);
        if (cashOutResults.some((cashOutResult) => cashOutResult && !cashOutResult.success)) {
            return {
                success: false,
                customerReferences: cashOutResults.map((cashOutResult) => cashOutResult === null || cashOutResult === void 0 ? void 0 : cashOutResult.сashOutResult.customerReference),
            };
        }
        const [refundsToSenderCustomerReference, transferToPlatformCustomerReference, transferToRecipientCustomerReference,] = cashOutResults.map((cashOutResult) => cashOutResult === null || cashOutResult === void 0 ? void 0 : cashOutResult.сashOutResult.customerReference);
        if (!this.isCashOutInfoMatched(cashOutInfo, {
            refundsToSenderSuccess: !!refundsToSenderCustomerReference,
            transferToPlatformSuccess: !!transferToPlatformCustomerReference,
            transferToRecipientSuccess: !!transferToRecipientCustomerReference,
            withdrawalFromSenderSuccess: cashOutInfo.needWithdrawalFromSender,
        })) {
            return {
                success: false,
                customerReferences: [
                    refundsToSenderCustomerReference,
                    transferToPlatformCustomerReference,
                    transferToRecipientCustomerReference,
                ],
            };
        }
        return {
            success: true,
            customerReferences: [
                refundsToSenderCustomerReference,
                transferToPlatformCustomerReference,
                transferToRecipientCustomerReference,
            ],
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
    async finishCancelation({ contract, allPaymentTransactions, updatingPaymentTransaction, }, checkOutDate, trxId) {
        contract.endPending();
        const paymentTransactions = allPaymentTransactions === null || allPaymentTransactions === void 0 ? void 0 : allPaymentTransactions.filter((paymentTransaction) => !paymentTransaction.id.equals(updatingPaymentTransaction === null || updatingPaymentTransaction === void 0 ? void 0 : updatingPaymentTransaction.id)).reduce((acc, curr) => {
            if (curr.status === types_1.PaymentTransactionStatus.CASH_IN_WAITING &&
                Date.parse(curr.startDate.value) > Date.parse(checkOutDate)) {
                return { deliting: [...acc.deliting, curr], saving: acc.saving };
            }
            if (curr.status === types_1.PaymentTransactionStatus.CASH_OUT_WAITING) {
                const isConcludedContractWithFutureRecomputedTransaction = updatingPaymentTransaction && contract.status.value === enums_1.ContractStatus.CONCLUDED;
                if (!isConcludedContractWithFutureRecomputedTransaction) {
                    curr.cancel();
                }
                return { deliting: acc.deliting, saving: [...acc.saving, curr] };
            }
            return acc;
        }, { deliting: [], saving: [] });
        await Promise.all([
            this.contractRepository.save(contract, trxId),
            updatingPaymentTransaction
                ? this.paymentTransactionRepository.save(updatingPaymentTransaction, trxId)
                : undefined,
            paymentTransactions === null || paymentTransactions === void 0 ? void 0 : paymentTransactions.deliting.map((transaction) => this.paymentTransactionRepository.delete(transaction, trxId)),
            paymentTransactions === null || paymentTransactions === void 0 ? void 0 : paymentTransactions.saving.map((transaction) => this.paymentTransactionRepository.save(transaction, trxId)),
        ]);
        await this.commandBus.execute(new update_contract_payment_transaction_command_1.UpdateContractPaymentTransactionCommand(contract.id, trxId));
        this.publishContract(contract);
        if (updatingPaymentTransaction) {
            this.publishPaymentTransaction(updatingPaymentTransaction, types_2.PaymentTransactionPubSubEvent.UPDATED);
        }
        paymentTransactions === null || paymentTransactions === void 0 ? void 0 : paymentTransactions.saving.map((transaction) => this.publishPaymentTransaction(transaction, types_2.PaymentTransactionPubSubEvent.UPDATED));
        paymentTransactions === null || paymentTransactions === void 0 ? void 0 : paymentTransactions.deliting.map((transaction) => this.publishPaymentTransaction(transaction, types_2.PaymentTransactionPubSubEvent.DELETED));
    }
    isCashOutInfoMatched(cashOutNeeds, cashOutResults) {
        const results = cashOutResults !== null && cashOutResults !== void 0 ? cashOutResults : cashOutNeeds;
        const needRefundsToSender = cashOutNeeds.needRefundsToSender ? results.refundsToSenderSuccess : true;
        const needTransferToPlatform = cashOutNeeds.needTransferToPlatform ? results.transferToPlatformSuccess : true;
        const needTransferToRecipient = cashOutNeeds.needTransferToRecipient ? results.transferToRecipientSuccess : true;
        const needWithdrawalFromSender = cashOutNeeds.needWithdrawalFromSender ? results.withdrawalFromSenderSuccess : true;
        return needRefundsToSender && needTransferToPlatform && needTransferToRecipient && needWithdrawalFromSender;
    }
    async publishPaymentTransaction(paymentTransaction, event) {
        const mapper = new payment_transaction_orm_mapper_1.PaymentTransactionOrmMapper(payment_transaction_entity_1.PaymentTransactionEntity);
        const ormPaymentTransaction = await mapper.toOrmEntity(paymentTransaction);
        this.pubSubService.publish(pub_sub_service_1.PubSubTrigger.UPDATE_PAYMENT_TRANSACTION, {
            paymentTransaction: ormPaymentTransaction,
            cardOwnerId: paymentTransaction.senderId.value,
            event,
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
    (0, bull_1.Process)(types_3.PaymentTransactionProcess.CANCEL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentTransactionCancelProcessor.prototype, "handle", null);
PaymentTransactionCancelProcessor = __decorate([
    (0, bull_1.Processor)(types_3.PaymentBulls.PAYMENT_TRANSACTION),
    __metadata("design:paramtypes", [innopay_cash_out_service_1.InnopayCashOutService,
        innopay_cash_in_service_1.InnopayCashInService,
        payment_transaction_repository_1.PaymentTransactionRepository,
        contract_repository_1.ContractRepository,
        user_repository_1.UserRepository,
        complete_cash_out_innopay_transaction_producer_1.CompleteCashOutInnopayTransactionProducer,
        config_1.ConfigService,
        unit_of_work_1.UnitOfWork,
        cqrs_1.CommandBus,
        pub_sub_service_1.PubSubService])
], PaymentTransactionCancelProcessor);
exports.PaymentTransactionCancelProcessor = PaymentTransactionCancelProcessor;
//# sourceMappingURL=transaction-cancel.processor.js.map