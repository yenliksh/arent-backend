"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongTermRentTenantCancelationStrategy = void 0;
const types_1 = require("../../../../payment-transaction/domain/types");
const enums_1 = require("../../../../../../infrastructure/enums");
const exceptions_1 = require("../../../../../../libs/exceptions");
const illegal_operation_exception_1 = require("../../../../../../libs/exceptions/illegal-operation.exception");
const date_util_1 = require("../../../../../../libs/utils/date-util");
const constants_1 = require("../../../../../constants");
const types_2 = require("../../rental-manager/types");
const cost_rounds_util_1 = require("../../rental-strategies/utils/cost-rounds.util");
const types_3 = require("../types");
const base_long_term_rent_cancelation_strategy_1 = require("./base-long-term-rent-cancelation.strategy");
class LongTermRentTenantCancelationStrategy extends base_long_term_rent_cancelation_strategy_1.BaseLongTermRentCancelationStrategy {
    constructor(contract, transactions) {
        super(contract, [...transactions].sort((a, b) => a.startDate.getDate().getTime() - b.startDate.getDate().getTime()));
        this.contract = contract;
        if (!contract.cancellationPolicy.longTermCancellationPolicy) {
            const errorMessage = 'Contract must have contain long term cancelation policy';
            throw new exceptions_1.ArgumentInvalidException(errorMessage);
        }
        this._cancelationType = contract.cancellationPolicy.longTermCancellationPolicy;
    }
    getCurrentStayTransaction(now = date_util_1.DateUtil.utcNow()) {
        var _a;
        const currentStayTransactionIndex = this.transactions.findIndex((i) => now.isBetween(i.startDate.value, i.endDate.value));
        const currentStayTransaction = (_a = this.transactions) === null || _a === void 0 ? void 0 : _a[currentStayTransactionIndex];
        if (!currentStayTransaction) {
            throw new illegal_operation_exception_1.IllegalOperationException('The current date is not within the date of stay');
        }
        return currentStayTransaction;
    }
    getNextStayTransaction(now = date_util_1.DateUtil.utcNow()) {
        var _a;
        const currentStayTransactionIndex = this.transactions.findIndex((i) => now.isBetween(i.startDate.value, i.endDate.value));
        const nextStayTransaction = (_a = this.transactions) === null || _a === void 0 ? void 0 : _a[currentStayTransactionIndex + 1];
        if (!nextStayTransaction) {
            return null;
        }
        return nextStayTransaction;
    }
    getFirstPaidTransaction() {
        const sortedTransactions = [...this.transactions]
            .filter((i) => [types_1.PaymentTransactionStatus.COMPLETED, types_1.PaymentTransactionStatus.CASH_OUT_WAITING].includes(i.status))
            .sort((a, b) => (date_util_1.DateUtil.parseUTC(a.startDate.value).isBefore(b.startDate.value) ? -1 : 1));
        const firstPaidTransaction = (sortedTransactions === null || sortedTransactions === void 0 ? void 0 : sortedTransactions[0]) &&
            [types_1.PaymentTransactionStatus.COMPLETED, types_1.PaymentTransactionStatus.CASH_OUT_WAITING].includes(sortedTransactions === null || sortedTransactions === void 0 ? void 0 : sortedTransactions[0].status)
            ? sortedTransactions[0]
            : null;
        if (!firstPaidTransaction) {
            throw new illegal_operation_exception_1.IllegalOperationException('Cannot be found first paid transactions');
        }
        return firstPaidTransaction;
    }
    getLastPaidTransaction() {
        const sortedTransactions = [...this.transactions]
            .filter((i) => [types_1.PaymentTransactionStatus.COMPLETED, types_1.PaymentTransactionStatus.CASH_OUT_WAITING].includes(i.status))
            .sort((a, b) => (date_util_1.DateUtil.parseUTC(a.startDate.value).isBefore(b.startDate.value) ? 1 : -1));
        const firstPaidTransaction = (sortedTransactions === null || sortedTransactions === void 0 ? void 0 : sortedTransactions[0]) &&
            [types_1.PaymentTransactionStatus.COMPLETED, types_1.PaymentTransactionStatus.CASH_OUT_WAITING].includes(sortedTransactions === null || sortedTransactions === void 0 ? void 0 : sortedTransactions[0].status)
            ? sortedTransactions[0]
            : null;
        if (!firstPaidTransaction) {
            throw new illegal_operation_exception_1.IllegalOperationException('Cannot be found last paid transactions');
        }
        return firstPaidTransaction;
    }
    getUnpaidAmountOfHours(now = date_util_1.DateUtil.utcNow()) {
        const currentStayTransaction = this.getCurrentStayTransaction(now);
        if (![types_1.PaymentTransactionStatus.COMPLETED, types_1.PaymentTransactionStatus.CASH_OUT_WAITING].includes(currentStayTransaction.status)) {
            throw new illegal_operation_exception_1.IllegalOperationException('To cancel of rent, you must pay the current month');
        }
        const minStayCompensationHours = date_util_1.DateUtil.getDiffHours(now.toISOString(), this.getMinAllowedCheckoutDate(now));
        const paidAmountOfHours = date_util_1.DateUtil.getDiffHours(now.toISOString(), currentStayTransaction.endDate.value);
        const nextStayTransaction = this.getNextStayTransaction(now);
        const unpaidAmountOfHours = minStayCompensationHours - paidAmountOfHours;
        if (nextStayTransaction && nextStayTransaction.status === types_1.PaymentTransactionStatus.COMPLETED) {
            const additionalPaidAmountOfHours = date_util_1.DateUtil.getDiffHours(nextStayTransaction.startDate.value, nextStayTransaction.endDate.value);
            return unpaidAmountOfHours - additionalPaidAmountOfHours;
        }
        return unpaidAmountOfHours;
    }
    getCostPerHour() {
        var _a;
        const transaction = (_a = this.transactions) === null || _a === void 0 ? void 0 : _a[0];
        if (!transaction) {
            throw new illegal_operation_exception_1.IllegalOperationException('For getting cost per hour transaction does not exist');
        }
        const wholeStayHours = date_util_1.DateUtil.getDiffHours(transaction.startDate.value, transaction.endDate.value);
        return (transaction.cost.cost * 1) / wholeStayHours;
    }
    handle(checkOutDate) {
        const cancelationRulesMeta = LongTermRentTenantCancelationStrategy.cancelationRulesMap[this._cancelationType];
        const now = date_util_1.DateUtil.utcNow().millisecond(0);
        const nowIsStayTime = date_util_1.DateUtil.getDiffHours(now.toISOString(), this.arrivalDate) <= 0;
        if (this._cancelationByAdmin) {
            const stayHours = date_util_1.DateUtil.getDiffHours(this.arrivalDate, now.toISOString());
            const [refundsAmount, totalAmountToBeTransferred, totalRevenue] = this.computeRefundByAdmin();
            if (stayHours <= cancelationRulesMeta.seriousReasonTimeInHours) {
                return {
                    strategyType: types_2.RentPeriodStrategyType.LONG_TERM_RENT,
                    cancelationPolicyType: this._cancelationType,
                    cancelationDate: now.toISOString(),
                    checkOutDate: now.toISOString(),
                    refundsAmountToSender: refundsAmount,
                    transferAmountToRecipient: totalAmountToBeTransferred,
                    transferAmountToPlatform: totalRevenue,
                    checkoutType: types_3.LongPeriodTenantCheckOutCancelationType.CANCELATION_BY_ADMIN,
                };
            }
            throw new illegal_operation_exception_1.IllegalOperationException('Cancellation by the administrator cannot be performed due to: more than 24 hours have passed since the stay');
        }
        if (!nowIsStayTime && cancelationRulesMeta.relativeBooking != null) {
            const hoursHavePassedSinceBooking = date_util_1.DateUtil.getDiffHours(this.bookingDate, now.toISOString());
            const timeLeftBeforeArrival = date_util_1.DateUtil.getDiffHours(now.toISOString(), this.arrivalDate);
            const { relativeBooking } = cancelationRulesMeta;
            if (hoursHavePassedSinceBooking <= relativeBooking.cancellationTime &&
                timeLeftBeforeArrival >= relativeBooking.arrivingDaysLeftInHours) {
                const [refundAmount, totalAmountToBeTransferred, totalRevenue] = this.computeRefundByFirstTransaction();
                return {
                    strategyType: types_2.RentPeriodStrategyType.LONG_TERM_RENT,
                    cancelationPolicyType: this._cancelationType,
                    cancelationDate: now.toISOString(),
                    checkOutDate: now.toISOString(),
                    refundsAmountToSender: refundAmount,
                    transferAmountToRecipient: totalAmountToBeTransferred,
                    transferAmountToPlatform: totalRevenue,
                    checkoutType: types_3.LongPeriodTenantCheckOutCancelationType.ALLOWED_REFUND,
                };
            }
        }
        const timesBeforeFirstArrival = date_util_1.DateUtil.getDiffHours(now.toISOString(), this.arrivalDate);
        const isNotYetStayTime = timesBeforeFirstArrival > 0;
        if (isNotYetStayTime) {
            const timeLeftBeforeArrival = date_util_1.DateUtil.getDiffHours(now.toISOString(), this.arrivalDate);
            if (cancelationRulesMeta.timeBeforeArrivalInHours != null &&
                timeLeftBeforeArrival >= cancelationRulesMeta.timeBeforeArrivalInHours) {
                const [refundAmount, totalAmountToBeTransferred, totalRevenue] = this.computeRefundByFirstTransaction();
                return {
                    strategyType: types_2.RentPeriodStrategyType.LONG_TERM_RENT,
                    cancelationPolicyType: this._cancelationType,
                    cancelationDate: now.toISOString(),
                    checkOutDate: now.toISOString(),
                    refundsAmountToSender: refundAmount,
                    transferAmountToRecipient: totalAmountToBeTransferred,
                    transferAmountToPlatform: totalRevenue,
                    checkoutType: types_3.LongPeriodTenantCheckOutCancelationType.REFUND_BEFORE_THIRTY_DAYS_ARRIVAL,
                };
            }
            const firstPaidTransaction = this.getFirstPaidTransaction();
            const paidStayingTimeInHours = date_util_1.DateUtil.getDiffHours(firstPaidTransaction.startDate.value, firstPaidTransaction.endDate.value);
            const cashInTax = firstPaidTransaction.totalAmountPayable * constants_1.INNOPAY_CASH_IN_TAX_RATE;
            const totalAmountWithTax = firstPaidTransaction.totalAmountPayable - firstPaidTransaction.taxAmount - cashInTax;
            const refundsAmountToSender = (0, cost_rounds_util_1.costCeil)((timesBeforeFirstArrival * totalAmountWithTax) / paidStayingTimeInHours);
            const transferAmountToRecipient = (0, cost_rounds_util_1.costCeil)(totalAmountWithTax - refundsAmountToSender);
            return {
                strategyType: types_2.RentPeriodStrategyType.LONG_TERM_RENT,
                cancelationPolicyType: this._cancelationType,
                cancelationDate: now.toISOString(),
                checkOutDate: now.toISOString(),
                refundsAmountToSender,
                transferAmountToRecipient,
                transferAmountToPlatform: firstPaidTransaction.taxAmount,
                checkoutType: types_3.LongPeriodTenantCheckOutCancelationType.PARTIAL_REFUND,
            };
        }
        if (!checkOutDate) {
            throw new exceptions_1.ArgumentInvalidException('For long-term rental cancellation policy, a check-out date is required');
        }
        const diffCheckoutDate = date_util_1.DateUtil.getDiffHours(now.toISOString(), checkOutDate);
        if (diffCheckoutDate < 0) {
            throw new illegal_operation_exception_1.IllegalOperationException('Check-out date cannot be less then current date');
        }
        const isBetweenArrivalAndDepartureDates = date_util_1.DateUtil.parseUTC(checkOutDate).isBetween(this.arrivalDate, this.departureDate);
        if (!isBetweenArrivalAndDepartureDates) {
            throw new illegal_operation_exception_1.IllegalOperationException('Check-out date should be between arrival and departure dates');
        }
        const minAllowedCheckoutDate = this.getMinAllowedCheckoutDate(now);
        const isImmediateWithdrawal = date_util_1.DateUtil.parseUTC(minAllowedCheckoutDate).isAfter(checkOutDate);
        if (isImmediateWithdrawal) {
            const unpaidAmountOfHours = this.getUnpaidAmountOfHours(now);
            const costPerHour = this.getCostPerHour();
            const unpaidAmountOfHoursCost = unpaidAmountOfHours ? unpaidAmountOfHours * costPerHour : 0;
            const livinSenderTaxAmount = unpaidAmountOfHoursCost * this._senderTaxRate;
            const livinRecipientTaxAmount = unpaidAmountOfHoursCost * this._recipientTaxRate;
            const withdrawalAmountFromSender = unpaidAmountOfHoursCost + livinSenderTaxAmount;
            const cashInTax = withdrawalAmountFromSender * constants_1.INNOPAY_CASH_IN_TAX_RATE;
            const transferAmountToRecipient = withdrawalAmountFromSender - livinSenderTaxAmount - livinRecipientTaxAmount;
            const cashOutTaxCompensation = (transferAmountToRecipient / (1 - constants_1.INNOPAY_CASH_OUT_TAX_RATE)) * constants_1.INNOPAY_CASH_OUT_TAX_RATE;
            let transferAmountToPlatform = livinSenderTaxAmount + livinRecipientTaxAmount - cashOutTaxCompensation - cashInTax;
            let transferAmountToRecipientWithCompensation = transferAmountToRecipient + cashOutTaxCompensation;
            const lastPaidTransaction = this.getLastPaidTransaction();
            const isMoneyOnSubAccount = lastPaidTransaction.status === types_1.PaymentTransactionStatus.CASH_OUT_WAITING;
            if (isMoneyOnSubAccount) {
                transferAmountToRecipientWithCompensation += lastPaidTransaction.totalAmountToBeTransferred;
                transferAmountToPlatform += lastPaidTransaction.totalRevenue;
            }
            return {
                strategyType: types_2.RentPeriodStrategyType.LONG_TERM_RENT,
                cancelationPolicyType: this._cancelationType,
                cancelationDate: now.toISOString(),
                checkOutDate,
                withdrawalAmountFromSender: (0, cost_rounds_util_1.costCeil)(withdrawalAmountFromSender),
                refundsAmountToSender: 0,
                transferAmountToRecipient: (0, cost_rounds_util_1.costCeil)(transferAmountToRecipientWithCompensation),
                transferAmountToPlatform: (0, cost_rounds_util_1.costFloor)(transferAmountToPlatform),
                checkoutType: types_3.LongPeriodTenantCheckOutCancelationType.CHECK_OUT_LESS_THAN_THIRTY_DAYS_NOTICE,
            };
        }
        const recomputedLastStayTransaction = this.recomputeLastTransaction(now, checkOutDate, minAllowedCheckoutDate);
        return {
            strategyType: types_2.RentPeriodStrategyType.LONG_TERM_RENT,
            cancelationPolicyType: this._cancelationType,
            cancelationDate: now.toISOString(),
            checkOutDate,
            recomputedLastStayTransaction,
            refundsAmountToSender: 0,
            transferAmountToRecipient: 0,
            transferAmountToPlatform: 0,
            checkoutType: types_3.LongPeriodTenantCheckOutCancelationType.CHECK_OUT_GREATER_THAN_THIRTY_DAYS_NOTICE,
        };
    }
    recomputeLastTransaction(now = date_util_1.DateUtil.utcNow(), checkoutDate, compensationPaymentDate) {
        var _a;
        const currentStayTransactionIndex = this.transactions.findIndex((i) => now.isBetween(i.startDate.value, i.endDate.value));
        const currentStayTransaction = (_a = this.transactions) === null || _a === void 0 ? void 0 : _a[currentStayTransactionIndex];
        if (!currentStayTransaction) {
            throw new illegal_operation_exception_1.IllegalOperationException('The current date is not within the date of stay');
        }
        const finalCheckoutDate = date_util_1.DateUtil.parseUTC(compensationPaymentDate).isBefore(checkoutDate)
            ? checkoutDate
            : compensationPaymentDate;
        const lastCheckoutTransaction = this.transactions.find((i) => date_util_1.DateUtil.parseUTC(finalCheckoutDate).isBetween(i.startDate.value, i.endDate.value, undefined, '[]') &&
            i.status === types_1.PaymentTransactionStatus.CASH_IN_WAITING);
        if (!lastCheckoutTransaction) {
            throw new illegal_operation_exception_1.IllegalOperationException('Allowed payment transaction cannot be found');
        }
        lastCheckoutTransaction.setCheckOutDate(finalCheckoutDate);
        return lastCheckoutTransaction;
    }
    getMinAllowedCheckoutDate(now = date_util_1.DateUtil.utcNow()) {
        var _a, _b;
        const allowedCheckoutDate = now.add(1, 'month');
        const currentStayTransactionIndex = this.transactions.findIndex((i) => now.isBetween(i.startDate.value, i.endDate.value));
        const currentStayTransaction = (_a = this.transactions) === null || _a === void 0 ? void 0 : _a[currentStayTransactionIndex];
        if (!currentStayTransaction) {
            throw new illegal_operation_exception_1.IllegalOperationException('The current date is not within the date of stay');
        }
        const currentNextTransaction = (_b = this.transactions) === null || _b === void 0 ? void 0 : _b[currentStayTransactionIndex + 1];
        if (!currentNextTransaction) {
            return currentStayTransaction.endDate.value;
        }
        if (allowedCheckoutDate.isBetween(currentNextTransaction.startDate.value, currentNextTransaction.endDate.value)) {
            return allowedCheckoutDate.toISOString();
        }
        return currentNextTransaction.endDate.value;
    }
    computeRefundByAdmin() {
        const paidTransaction = this.getFirstPaidTransaction();
        const refundsAmount = (0, cost_rounds_util_1.costCeil)(paidTransaction.totalAmountPayable - paidTransaction.totalAmountPayable * constants_1.INNOPAY_CASH_IN_TAX_RATE);
        const totalAmountToBeTransferred = 0;
        const totalRevenue = 0;
        return [refundsAmount, totalAmountToBeTransferred, totalRevenue];
    }
    computeRefundByFirstTransaction() {
        const paidTransaction = this.getFirstPaidTransaction();
        const refundAmount = (0, cost_rounds_util_1.costCeil)(paidTransaction.totalAmountPayable -
            paidTransaction.taxAmount -
            paidTransaction.totalAmountPayable * constants_1.INNOPAY_CASH_IN_TAX_RATE);
        const totalAmountToBeTransferred = 0;
        const totalRevenue = paidTransaction.taxAmount;
        return [refundAmount, totalAmountToBeTransferred, totalRevenue];
    }
}
exports.LongTermRentTenantCancelationStrategy = LongTermRentTenantCancelationStrategy;
LongTermRentTenantCancelationStrategy.cancelationRulesMap = {
    [enums_1.LongTermRentCancellationPolicyType.FORFEIT]: {
        timeBeforeArrivalInHours: 720,
        relativeBooking: {
            cancellationTime: 24,
            arrivingDaysLeftInHours: 0,
        },
        cancellationFeeRateSoft: 1,
        cancellationFeeRateHard: 0,
        seriousReasonTimeInHours: 24,
    },
};
//# sourceMappingURL=long-term-rent-tenant-cancelation.strategy.js.map