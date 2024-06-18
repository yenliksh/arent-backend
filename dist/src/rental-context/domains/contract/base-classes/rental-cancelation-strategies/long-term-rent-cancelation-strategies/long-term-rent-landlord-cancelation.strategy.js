"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongTermRentLandlordCancelationStrategy = void 0;
const types_1 = require("../../../../payment-transaction/domain/types");
const illegal_operation_exception_1 = require("../../../../../../libs/exceptions/illegal-operation.exception");
const date_util_1 = require("../../../../../../libs/utils/date-util");
const constants_1 = require("../../../../../constants");
const types_2 = require("../../rental-manager/types");
const cost_rounds_util_1 = require("../../rental-strategies/utils/cost-rounds.util");
const base_long_term_rent_cancelation_strategy_1 = require("./base-long-term-rent-cancelation.strategy");
class LongTermRentLandlordCancelationStrategy extends base_long_term_rent_cancelation_strategy_1.BaseLongTermRentCancelationStrategy {
    constructor(contract, transactions) {
        super(contract, [...transactions].sort((a, b) => a.startDate.getDate().getTime() - b.startDate.getDate().getTime()));
        this.contract = contract;
        this._validExcuse = false;
        this._forcedCancelation = false;
    }
    validExcuse() {
        this._validExcuse = true;
    }
    forcedCancelation() {
        this._forcedCancelation = true;
    }
    handle() {
        const now = date_util_1.DateUtil.utcNow().millisecond(0);
        if (this._cancelationByAdmin) {
            if (this._forcedCancelation) {
                return {
                    strategyType: types_2.RentPeriodStrategyType.LONG_TERM_RENT,
                    cancelationDate: now.toISOString(),
                    checkOutDate: now.toISOString(),
                    refundsAmountToSender: 0,
                    withdrawalAmountFromRecipient: 0,
                    transferAmountToRecipient: 0,
                    transferAmountToPlatform: 0,
                    isFine: false,
                };
            }
            const { refundsAmountToSender, withdrawalAmountFromRecipient, totalAmountToBeTransferred, totalRevenue } = this.computeRefundsCancelationByAdmin();
            if (this._validExcuse) {
                return {
                    strategyType: types_2.RentPeriodStrategyType.LONG_TERM_RENT,
                    cancelationDate: now.toISOString(),
                    checkOutDate: now.toISOString(),
                    refundsAmountToSender,
                    withdrawalAmountFromRecipient,
                    transferAmountToRecipient: totalAmountToBeTransferred,
                    transferAmountToPlatform: totalRevenue,
                    isFine: false,
                };
            }
            throw new illegal_operation_exception_1.IllegalOperationException('Admin cannot be able cancel rent by not valid excuse');
        }
        return {
            strategyType: types_2.RentPeriodStrategyType.LONG_TERM_RENT,
            cancelationDate: now.toISOString(),
            checkOutDate: now.toISOString(),
            refundsAmountToSender: 0,
            withdrawalAmountFromRecipient: 0,
            transferAmountToRecipient: 0,
            transferAmountToPlatform: 0,
            isFine: false,
        };
    }
    lastPayedTransaction() {
        const sortedTransactions = [...this.transactions]
            .filter((i) => [types_1.PaymentTransactionStatus.COMPLETED, types_1.PaymentTransactionStatus.CASH_OUT_WAITING].includes(i.status))
            .sort((a, b) => (date_util_1.DateUtil.parseUTC(a.startDate.value).isAfter(b.startDate.value) ? 1 : -1));
        const lastPaidTransaction = (sortedTransactions === null || sortedTransactions === void 0 ? void 0 : sortedTransactions[0]) &&
            [types_1.PaymentTransactionStatus.COMPLETED, types_1.PaymentTransactionStatus.CASH_OUT_WAITING].includes(sortedTransactions === null || sortedTransactions === void 0 ? void 0 : sortedTransactions[0].status)
            ? sortedTransactions[0]
            : null;
        if (!lastPaidTransaction) {
            throw new illegal_operation_exception_1.IllegalOperationException('Cannot be found last paid transactions');
        }
        return lastPaidTransaction;
    }
    computeRefundsCancelationByAdmin(now = date_util_1.DateUtil.utcNow().millisecond(0)) {
        const currentPayedTransaction = this.lastPayedTransaction();
        if (!currentPayedTransaction) {
            throw new illegal_operation_exception_1.IllegalOperationException('Cancelation can not be performed for unpaid contract');
        }
        const stayHours = date_util_1.DateUtil.getDiffHours(this.arrivalDate, now.toISOString());
        const isNotStayTime = stayHours < 0;
        const isMoneyOnSubAccount = currentPayedTransaction.status === types_1.PaymentTransactionStatus.CASH_OUT_WAITING;
        const fullRefundAmount = currentPayedTransaction.cost.cost + currentPayedTransaction.cost.cost * this._senderTaxRate;
        let totalAmountToBeTransferred = 0;
        let totalRevenue = 0;
        const cashInTax = fullRefundAmount * constants_1.INNOPAY_CASH_IN_TAX_RATE;
        const refundAmount = isNotStayTime ? fullRefundAmount - cashInTax : 0;
        if (isMoneyOnSubAccount && !isNotStayTime) {
            totalAmountToBeTransferred += currentPayedTransaction.totalAmountToBeTransferred;
            totalRevenue += currentPayedTransaction.totalRevenue;
        }
        return {
            refundsAmountToSender: (0, cost_rounds_util_1.costCeil)(refundAmount),
            withdrawalAmountFromRecipient: 0,
            totalAmountToBeTransferred: (0, cost_rounds_util_1.costCeil)(totalAmountToBeTransferred),
            totalRevenue: (0, cost_rounds_util_1.costFloor)(totalRevenue),
        };
    }
}
exports.LongTermRentLandlordCancelationStrategy = LongTermRentLandlordCancelationStrategy;
//# sourceMappingURL=long-term-rent-landlord-cancelation.strategy.js.map