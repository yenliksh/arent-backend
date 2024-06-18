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
exports.SystemFirstContractPayHandler = void 0;
const payment_transaction_repository_1 = require("../../../../domain-repositories/payment-transaction/payment-transaction.repository");
const reverse_innopay_transaction_command_1 = require("../../../innopay-transaction/commands/reverse-innopay-transaction/reverse-innopay-transaction.command");
const types_1 = require("../../domain/types");
const unit_of_work_1 = require("../../../../../infrastructure/database/unit-of-work/unit-of-work");
const innopay_service_bad_request_problem_1 = require("../../../../../infrastructure/problems/innopay-service-bad-request.problem");
const exceptions_1 = require("../../../../../libs/exceptions");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const innopay_cash_in_service_1 = require("../../../../../third-parties/innopay-payment/src/services/innopay-cash-in.service");
const oxide_ts_1 = require("oxide.ts");
const system_first_contract_pay_command_1 = require("./system-first-contract-pay.command");
let SystemFirstContractPayHandler = class SystemFirstContractPayHandler {
    constructor(paymentTransactionRepository, innopayCashInService, unitOfWork, commandBus) {
        this.paymentTransactionRepository = paymentTransactionRepository;
        this.innopayCashInService = innopayCashInService;
        this.unitOfWork = unitOfWork;
        this.commandBus = commandBus;
    }
    async execute(command) {
        const { contractId } = command;
        const trxId = await this.unitOfWork.start();
        try {
            const paymentTransaction = await this.paymentTransactionRepository.findContractFirstPayment(contractId.value, trxId);
            if (!paymentTransaction) {
                return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Payment transaction not found'));
            }
            if (!paymentTransaction.isReadyToFirstContractPay()) {
                return (0, oxide_ts_1.Err)(new exceptions_1.ArgumentInvalidException('Payment is not ready to first contract pay now'));
            }
            let payResult;
            let customerReference;
            let cardMeta;
            try {
                const card = paymentTransaction.senderCardOrFail;
                cardMeta = card.cardMeta;
                const result = await this.innopayCashInService.paySavedCard({
                    amount: paymentTransaction.totalAmountPayable,
                    cardId: card.cnpCardId,
                    userLogin: card.userId.value,
                    userId: card.cnpUserId,
                    paymentTarget: paymentTransaction.contractId.value,
                });
                if (!result.payResult) {
                    await this.commandBus.execute(new reverse_innopay_transaction_command_1.ReverseInnopayTransactionCommand(result.customerReference));
                    throw new common_1.BadGatewayException('Something went wrong');
                }
                payResult = result.payResult;
                customerReference = result.customerReference.toString();
            }
            catch (error) {
                await this.unitOfWork.rollback(trxId);
                const message = error.message;
                return (0, oxide_ts_1.Err)(new innopay_service_bad_request_problem_1.InnopayServiceBadRequestProblem(message));
            }
            if (payResult) {
                paymentTransaction.cashInSuccess(cardMeta, { customerReference });
            }
            else {
                paymentTransaction.failure(types_1.PaymentInvoiceType.WITHDRAW, cardMeta, { customerReference });
            }
            await this.paymentTransactionRepository.save(paymentTransaction, trxId);
            await this.unitOfWork.execute(trxId);
            return (0, oxide_ts_1.Ok)({ id: paymentTransaction.id, customerReference });
        }
        catch (error) {
            await this.unitOfWork.rollback(trxId);
            throw error;
        }
    }
};
SystemFirstContractPayHandler = __decorate([
    (0, cqrs_1.CommandHandler)(system_first_contract_pay_command_1.SystemFirstContractPayCommand),
    __metadata("design:paramtypes", [payment_transaction_repository_1.PaymentTransactionRepository,
        innopay_cash_in_service_1.InnopayCashInService,
        unit_of_work_1.UnitOfWork,
        cqrs_1.CommandBus])
], SystemFirstContractPayHandler);
exports.SystemFirstContractPayHandler = SystemFirstContractPayHandler;
//# sourceMappingURL=system-first-contract-pay.handler.js.map