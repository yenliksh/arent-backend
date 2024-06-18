"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonShortMiddleTermRentLandlordCancelationStrategy = void 0;
const types_1 = require("../../../../payment-transaction/domain/types");
const enums_1 = require("../../../../../../infrastructure/enums");
const exceptions_1 = require("../../../../../../libs/exceptions");
const illegal_operation_exception_1 = require("../../../../../../libs/exceptions/illegal-operation.exception");
const date_util_1 = require("../../../../../../libs/utils/date-util");
const constants_1 = require("../../../../../constants");
const types_2 = require("../../rental-manager/types");
const cost_rounds_util_1 = require("../../rental-strategies/utils/cost-rounds.util");
const rental_cancelation_strategy_base_1 = require("../rental-cancelation-strategy.base");
const types_3 = require("../types");
class CommonShortMiddleTermRentLandlordCancelationStrategy extends rental_cancelation_strategy_base_1.RentalCancelationStrategyBase {
    constructor(contract, transactions) {
        var _a, _b;
        super(contract);
        this.contract = contract;
        this.transactions = transactions;
        this._validExcuse = false;
        this._numberOfHoursBeforeTransferMoneyAfterStay = 24;
        this._strictTimeBeforeArrival = 24;
        this._senderTaxRate = constants_1.LIVIN_SHORT_TERM_RENT_SENDER_TAX_RATE;
        this._recipientTaxRate = constants_1.LIVIN_SHORT_TERM_RENT_RECIPIENT_TAX_RATE;
        this.nowIsStayTime = (now = date_util_1.DateUtil.utcNow().millisecond(0)) => {
            return date_util_1.DateUtil.getDiffHours(now.toISOString(), this.arrivalDate) <= 0;
        };
        this.periodTypeMap = {
            [types_3.PeriodTypes.BEFORE_ARRIVAL]: (now = date_util_1.DateUtil.utcNow().millisecond(0)) => date_util_1.DateUtil.getDiffHours(now.toISOString(), date_util_1.DateUtil.parse(this.arrivalDate).toISOString()) > 0,
            [types_3.PeriodTypes.WITHIN_24_HOURS_OF_STAY]: (now = date_util_1.DateUtil.utcNow().millisecond(0)) => date_util_1.DateUtil.getDiffHours(this.arrivalDate, now.toISOString()) >= 0 &&
                date_util_1.DateUtil.getDiffHours(this.arrivalDate, now.toISOString()) < this._numberOfHoursBeforeTransferMoneyAfterStay,
            [types_3.PeriodTypes.WHILE_LIVING]: (now = date_util_1.DateUtil.utcNow().millisecond(0)) => date_util_1.DateUtil.getDiffHours(this.arrivalDate, now.toISOString()) >= this._numberOfHoursBeforeTransferMoneyAfterStay,
        };
        this.computeTaxByAdminCancelation = (now = date_util_1.DateUtil.utcNow().millisecond(0), currentPayedTransaction) => {
            const isReturnWithTax = date_util_1.DateUtil.getDiffHours(now.toISOString(), date_util_1.DateUtil.parse(this.arrivalDate).subtract(this._strictTimeBeforeArrival, 'hours').toISOString()) >= 0 || !this._validExcuse;
            const cost = this.contract.costAndCurrency.cost *
                this.getRentDays({
                    arrivalDate: currentPayedTransaction.startDate.value,
                    departureDate: currentPayedTransaction.endDate.value,
                });
            const totalAmountPayable = cost * (1 + this._senderTaxRate);
            const refundsAmountToSender = totalAmountPayable / (isReturnWithTax ? 1 : 1 + this._senderTaxRate) -
                currentPayedTransaction.totalAmountPayable * constants_1.INNOPAY_CASH_IN_TAX_RATE;
            const totalAmountToBeTransferred = 0;
            const totalRevenue = isReturnWithTax ? 0 : totalAmountPayable - refundsAmountToSender;
            totalAmountToBeTransferred;
            return {
                refundsAmountToSender: refundsAmountToSender,
                totalAmountToBeTransferred: totalAmountToBeTransferred,
                totalRevenue: totalRevenue,
            };
        };
        this.computeTaxByLivedHours = (now = date_util_1.DateUtil.utcNow().millisecond(0), currentPayedTransaction) => {
            const unusedAmountOfHours = this.getUnusedAmountOfHours(now, currentPayedTransaction);
            const totalHours = this.getTotalHours(currentPayedTransaction);
            const totalAmountPayable = currentPayedTransaction.totalAmountPayable;
            const oldSenderTax = (0, cost_rounds_util_1.costCeil)((totalAmountPayable * this._senderTaxRate) / (1 + this._senderTaxRate));
            const unusedHoursCost = unusedAmountOfHours * this.costPerHour;
            const cashInTax = totalAmountPayable * constants_1.INNOPAY_CASH_IN_TAX_RATE;
            const livinSenderTax = (0, cost_rounds_util_1.costCeil)(((totalHours - unusedAmountOfHours) * this.costPerHour * this._senderTaxRate) / (1 + this._senderTaxRate));
            const livinRecipientTax = (0, cost_rounds_util_1.costCeil)(((totalHours - unusedAmountOfHours) * this.costPerHour * this._recipientTaxRate) / (1 + this._recipientTaxRate));
            const refundsAmountToSender = unusedHoursCost - cashInTax + (oldSenderTax - livinSenderTax);
            const totalAmountToBeTransferred = ((totalHours - unusedAmountOfHours) * this.costPerHour * (1 - this._recipientTaxRate)) /
                (1 - constants_1.INNOPAY_CASH_OUT_TAX_RATE);
            const totalRevenue = livinSenderTax + livinRecipientTax - totalAmountToBeTransferred * constants_1.INNOPAY_CASH_OUT_TAX_RATE;
            const withdrawalAmountFromRecipient = unusedHoursCost;
            return {
                refundsAmountToSender: refundsAmountToSender,
                totalAmountToBeTransferred: totalAmountToBeTransferred,
                withdrawalAmountFromRecipient: withdrawalAmountFromRecipient,
                totalRevenue: totalRevenue,
            };
        };
        if (transactions.some((i) => i.contractId.value !== contract.id.value)) {
            throw new illegal_operation_exception_1.IllegalOperationException('Transactions is not related with contract');
        }
        if (contract.apartmentRentPeriodType !== enums_1.ApartmentRentPeriodType.SHORT_TERM) {
            const errorMessage = 'Contract must have contain short term rent period type';
            throw new exceptions_1.ArgumentInvalidException(errorMessage);
        }
        const arrivalDate = (_a = this.contract.arrivalDate) === null || _a === void 0 ? void 0 : _a.value;
        const departureDate = (_b = this.contract.departureDate) === null || _b === void 0 ? void 0 : _b.value;
        if (!arrivalDate || !departureDate) {
            const errorMessage = 'Cancelation of rent period cannot be invoked without required fields';
            throw new exceptions_1.ArgumentInvalidException(errorMessage);
        }
        this.arrivalDate = arrivalDate;
        this.departureDate = departureDate;
        if (contract.isFined) {
            this._recipientTaxRate += constants_1.FINE_RATE;
        }
    }
    validExcuse() {
        this._validExcuse = true;
    }
    currentPayedTransaction(now = date_util_1.DateUtil.utcNow().millisecond(0)) {
        const nowIsStayTime = this.nowIsStayTime(now);
        const paidTransactions = this.transactions.find((i) => [types_1.PaymentTransactionStatus.COMPLETED, types_1.PaymentTransactionStatus.CASH_OUT_WAITING].includes(i.status) &&
            nowIsStayTime
            ? now.isBetween(i.startDate.value, i.endDate.value)
            : true);
        return paidTransactions;
    }
    get costPerHour() {
        const dayInHours = 24;
        const priceInDay = this.contract.costAndCurrency.cost;
        const costPerHour = (1 * priceInDay) / dayInHours;
        return costPerHour;
    }
    getUnusedAmountOfHours(now = date_util_1.DateUtil.utcNow().millisecond(0), transaction) {
        const unusedAmountOfHours = date_util_1.DateUtil.getDiffHours(now.toISOString(), transaction.endDate.value, true);
        return unusedAmountOfHours + (this.cancelType === types_2.RentPeriodStrategyType.SHORT_TERM_RENT ? 2 : 0);
    }
    getTotalHours(transaction) {
        const totalHours = date_util_1.DateUtil.getDiffHours(transaction.startDate.value, transaction.endDate.value, true) +
            (this.cancelType === types_2.RentPeriodStrategyType.SHORT_TERM_RENT ? 2 : 0);
        return totalHours;
    }
}
exports.CommonShortMiddleTermRentLandlordCancelationStrategy = CommonShortMiddleTermRentLandlordCancelationStrategy;
//# sourceMappingURL=common-short-middle-term-rent-landlord-cancelation.stratiegy.js.map