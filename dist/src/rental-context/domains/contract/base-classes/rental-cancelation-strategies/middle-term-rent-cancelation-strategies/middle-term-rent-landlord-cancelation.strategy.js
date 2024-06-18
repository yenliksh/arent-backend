"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddleTermRentLandlordCancelationStrategy = void 0;
const types_1 = require("../../../../payment-transaction/domain/types");
const illegal_operation_exception_1 = require("../../../../../../libs/exceptions/illegal-operation.exception");
const date_util_1 = require("../../../../../../libs/utils/date-util");
const types_2 = require("../../rental-manager/types");
const cost_rounds_util_1 = require("../../rental-strategies/utils/cost-rounds.util");
const base_middle_term_rent_cancelation_strategy_1 = require("./base-middle-term-rent-cancelation.strategy");
class MiddleTermRentLandlordCancelationStrategy extends base_middle_term_rent_cancelation_strategy_1.BaseMiddleTermRentCancelationStrategy {
    constructor(contract, transactions) {
        super(contract, [...transactions].sort((a, b) => a.startDate.getDate().getTime() - b.startDate.getDate().getTime()));
        this.contract = contract;
    }
    handle() {
        const now = date_util_1.DateUtil.utcNow().millisecond(0);
        if (this._cancelationByAdmin) {
            const { refundsAmountToSender, withdrawalAmountFromRecipient, totalAmountToBeTransferred, totalRevenue } = this.computeRefundsByAdmin(now);
            return {
                strategyType: types_2.RentPeriodStrategyType.MIDDLE_TERM_RENT,
                cancelationDate: now.toISOString(),
                checkOutDate: now.toISOString(),
                refundsAmountToSender,
                withdrawalAmountFromRecipient,
                transferAmountToRecipient: totalAmountToBeTransferred,
                transferAmountToPlatform: totalRevenue,
                isFine: this._validExcuse ? false : true,
            };
        }
        return {
            strategyType: types_2.RentPeriodStrategyType.MIDDLE_TERM_RENT,
            cancelationDate: now.toISOString(),
            checkOutDate: now.toISOString(),
            refundsAmountToSender: 0,
            withdrawalAmountFromRecipient: 0,
            transferAmountToRecipient: 0,
            transferAmountToPlatform: 0,
            isFine: false,
        };
    }
    computeRefundsByAdmin(now = date_util_1.DateUtil.utcNow().millisecond(0)) {
        const currentPayedTransaction = this.currentPayedTransaction(now);
        if (!currentPayedTransaction) {
            throw new illegal_operation_exception_1.IllegalOperationException('Cancelation can not be performed for unpaid contract');
        }
        if (this.periodTypeMap.BEFORE_ARRIVAL(now)) {
            if (currentPayedTransaction.status !== types_1.PaymentTransactionStatus.CASH_OUT_WAITING) {
                throw new illegal_operation_exception_1.IllegalOperationException('Cancelation can not be performed for unpaid contract or money was already transferred');
            }
            const { refundsAmountToSender, totalAmountToBeTransferred, totalRevenue } = this.computeTaxByAdminCancelation(now, currentPayedTransaction);
            const withdrawalAmountFromRecipientWithTax = 0;
            return {
                refundsAmountToSender: (0, cost_rounds_util_1.costCeil)(refundsAmountToSender),
                withdrawalAmountFromRecipient: (0, cost_rounds_util_1.costCeil)(withdrawalAmountFromRecipientWithTax),
                totalAmountToBeTransferred: (0, cost_rounds_util_1.costCeil)(totalAmountToBeTransferred),
                totalRevenue: (0, cost_rounds_util_1.costFloor)(totalRevenue < 0 ? 0 : totalRevenue),
            };
        }
        if (this.periodTypeMap.WITHIN_24_HOURS_OF_STAY(now)) {
            if (currentPayedTransaction.status !== types_1.PaymentTransactionStatus.CASH_OUT_WAITING) {
                throw new illegal_operation_exception_1.IllegalOperationException('Cancelation can not be performed for unpaid contract or money was already transferred');
            }
            const { refundsAmountToSender, totalAmountToBeTransferred, totalRevenue } = this.computeTaxByLivedHours(now, currentPayedTransaction);
            const withdrawalAmountFromRecipientWithTax = 0;
            return {
                refundsAmountToSender: (0, cost_rounds_util_1.costCeil)(refundsAmountToSender),
                withdrawalAmountFromRecipient: (0, cost_rounds_util_1.costCeil)(withdrawalAmountFromRecipientWithTax),
                totalAmountToBeTransferred: (0, cost_rounds_util_1.costCeil)(totalAmountToBeTransferred),
                totalRevenue: (0, cost_rounds_util_1.costFloor)(totalRevenue),
            };
        }
        if (this.periodTypeMap.WHILE_LIVING(now)) {
            const recomputedTransfers = this.computeTaxByLivedHours(now, currentPayedTransaction);
            let totalAmountToBeTransferred = 0;
            let { totalRevenue } = recomputedTransfers;
            const { refundsAmountToSender, withdrawalAmountFromRecipient } = recomputedTransfers;
            if (currentPayedTransaction.status === types_1.PaymentTransactionStatus.CASH_OUT_WAITING) {
                totalAmountToBeTransferred += currentPayedTransaction.totalAmountToBeTransferred;
                totalRevenue += currentPayedTransaction.totalRevenue;
            }
            return {
                refundsAmountToSender: (0, cost_rounds_util_1.costCeil)(refundsAmountToSender),
                withdrawalAmountFromRecipient: (0, cost_rounds_util_1.costCeil)(withdrawalAmountFromRecipient),
                totalAmountToBeTransferred: (0, cost_rounds_util_1.costCeil)(totalAmountToBeTransferred),
                totalRevenue: (0, cost_rounds_util_1.costFloor)(totalRevenue),
            };
        }
        throw new illegal_operation_exception_1.IllegalOperationException('Something went wrong');
    }
}
exports.MiddleTermRentLandlordCancelationStrategy = MiddleTermRentLandlordCancelationStrategy;
//# sourceMappingURL=middle-term-rent-landlord-cancelation.strategy.js.map