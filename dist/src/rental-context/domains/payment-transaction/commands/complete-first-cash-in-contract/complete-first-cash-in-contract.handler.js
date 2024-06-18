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
exports.CompleteFirstCashInContractHandler = void 0;
const payment_transaction_repository_1 = require("../../../../domain-repositories/payment-transaction/payment-transaction.repository");
const types_1 = require("../../domain/types");
const unit_of_work_1 = require("../../../../../infrastructure/database/unit-of-work/unit-of-work");
const innopay_service_bad_request_problem_1 = require("../../../../../infrastructure/problems/innopay-service-bad-request.problem");
const exceptions_1 = require("../../../../../libs/exceptions");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const innopay_cash_in_service_1 = require("../../../../../third-parties/innopay-payment/src/services/innopay-cash-in.service");
const oxide_ts_1 = require("oxide.ts");
const complete_first_cash_in_contract_command_1 = require("./complete-first-cash-in-contract.command");
let CompleteFirstCashInContractHandler = class CompleteFirstCashInContractHandler {
    constructor(paymentTransactionRepository, innopayCashInService, unitOfWork) {
        this.paymentTransactionRepository = paymentTransactionRepository;
        this.innopayCashInService = innopayCashInService;
        this.unitOfWork = unitOfWork;
    }
    async execute(command) {
        const { contractId, customerReference } = command;
        const trxId = await this.unitOfWork.start();
        try {
            const paymentTransaction = await this.paymentTransactionRepository.findContractFirstPayment(contractId.value, trxId);
            if (!paymentTransaction) {
                throw new common_1.NotFoundException('Payment transaction not found');
            }
            if (!paymentTransaction.isReadyToFirstContractPay()) {
                throw new exceptions_1.ArgumentInvalidException('Payment is not ready to first contract pay now');
            }
            let payResult;
            let cardMeta;
            try {
                const card = paymentTransaction.senderCardOrFail;
                cardMeta = card.cardMeta;
                payResult = await this.innopayCashInService.endCashInFromNewCard({
                    customerReference,
                    transactionSuccess: true,
                });
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
            return (0, oxide_ts_1.Ok)(paymentTransaction.id);
        }
        catch (error) {
            await this.unitOfWork.rollback(trxId);
            return (0, oxide_ts_1.Err)(error);
        }
    }
};
CompleteFirstCashInContractHandler = __decorate([
    (0, cqrs_1.CommandHandler)(complete_first_cash_in_contract_command_1.CompleteFirstCashInContractCommand),
    __metadata("design:paramtypes", [payment_transaction_repository_1.PaymentTransactionRepository,
        innopay_cash_in_service_1.InnopayCashInService,
        unit_of_work_1.UnitOfWork])
], CompleteFirstCashInContractHandler);
exports.CompleteFirstCashInContractHandler = CompleteFirstCashInContractHandler;
//# sourceMappingURL=complete-first-cash-in-contract.handler.js.map