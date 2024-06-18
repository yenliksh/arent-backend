"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortTermRentTenantCancelationStrategy = void 0;
const types_1 = require("../../../../payment-transaction/domain/types");
const enums_1 = require("../../../../../../infrastructure/enums");
const illegal_operation_exception_1 = require("../../../../../../libs/exceptions/illegal-operation.exception");
const date_util_1 = require("../../../../../../libs/utils/date-util");
const constants_1 = require("../../../../../constants");
const types_2 = require("../../rental-manager/types");
const cost_rounds_util_1 = require("../../rental-strategies/utils/cost-rounds.util");
const base_short_term_rent_cancelation_strategy_1 = require("./base-short-term-rent-cancelation.strategy");
class ShortTermRentTenantCancelationStrategy extends base_short_term_rent_cancelation_strategy_1.BaseShortTermRentCancelationStrategy {
    constructor(contract, transactions) {
        super(contract, [...transactions].sort((a, b) => a.startDate.getDate().getTime() - b.startDate.getDate().getTime()));
        this.contract = contract;
        this._cancelationRulesMap = {
            [enums_1.ShortTermRentCancellationPolicyType.FLEXIBLE]: {
                timeBeforeArrivalInHours: 24,
                cancellationFeeRateSoft: 1,
                cancellationFeeRateHard: 0,
                seriousReasonTimeInHours: 24,
            },
            [enums_1.ShortTermRentCancellationPolicyType.MODERATE]: {
                timeBeforeArrivalInHours: 120,
                cancellationFeeRateSoft: 1,
                cancellationFeeRateHard: 0.5,
                seriousReasonTimeInHours: 24,
            },
            [enums_1.ShortTermRentCancellationPolicyType.INFLEXIBLE]: {
                timeBeforeArrivalInHours: 720,
                minTimeBeforeArrivalInHours: 168,
                relativeBooking: {
                    cancellationTime: 48,
                    arrivingDaysLeftInHours: 336,
                },
                cancellationFeeRateSoft: 1,
                cancellationFeeRateHard: 0.5,
                seriousReasonTimeInHours: 24,
            },
            [enums_1.ShortTermRentCancellationPolicyType.STRICT]: {
                minTimeBeforeArrivalInHours: 168,
                relativeBooking: {
                    cancellationTime: 48,
                    arrivingDaysLeftInHours: 336,
                },
                cancellationFeeRateSoft: 1,
                cancellationFeeRateHard: 0.5,
                seriousReasonTimeInHours: 24,
            },
        };
    }
    handle() {
        const cancelationRulesMeta = this._cancelationRulesMap[this._cancelationType];
        const now = date_util_1.DateUtil.utcNow().millisecond(0);
        const nowIsStayTime = date_util_1.DateUtil.getDiffHours(now.toISOString(), this.arrivalDate) <= 0;
        if (this._cancelationByAdmin) {
            const stayHours = date_util_1.DateUtil.getDiffHours(this.arrivalDate, now.toISOString());
            const [refundsAmount, totalAmountToBeTransferred, totalRevenue] = this.computeRefunds(1);
            if (stayHours <= cancelationRulesMeta.seriousReasonTimeInHours) {
                return {
                    strategyType: types_2.RentPeriodStrategyType.SHORT_TERM_RENT,
                    cancelationPolicyType: this._cancelationType,
                    cancelationDate: now.toISOString(),
                    checkOutDate: now.toISOString(),
                    refundsAmountToSender: refundsAmount,
                    transferAmountToRecipient: totalAmountToBeTransferred,
                    transferAmountToPlatform: totalRevenue,
                };
            }
            throw new illegal_operation_exception_1.IllegalOperationException('Cancellation by the administrator cannot be performed due to: more than 24 hours have passed since the stay');
        }
        if (!nowIsStayTime &&
            cancelationRulesMeta.relativeBooking != null &&
            cancelationRulesMeta.minTimeBeforeArrivalInHours != null) {
            const hoursHavePassedSinceBooking = date_util_1.DateUtil.getDiffHours(this.bookingDate, now.toISOString());
            const timeLeftBeforeArrival = date_util_1.DateUtil.getDiffHours(now.toISOString(), this.arrivalDate);
            const { relativeBooking, minTimeBeforeArrivalInHours } = cancelationRulesMeta;
            if (hoursHavePassedSinceBooking <= relativeBooking.cancellationTime &&
                timeLeftBeforeArrival >= relativeBooking.arrivingDaysLeftInHours &&
                minTimeBeforeArrivalInHours <= timeLeftBeforeArrival) {
                const [refundsAmount, totalAmountToBeTransferred, totalRevenue] = this.computeRefunds(cancelationRulesMeta.cancellationFeeRateSoft);
                return {
                    strategyType: types_2.RentPeriodStrategyType.SHORT_TERM_RENT,
                    cancelationPolicyType: this._cancelationType,
                    cancelationDate: now.toISOString(),
                    checkOutDate: now.toISOString(),
                    refundsAmountToSender: refundsAmount,
                    transferAmountToRecipient: totalAmountToBeTransferred,
                    transferAmountToPlatform: totalRevenue,
                };
            }
        }
        if (!nowIsStayTime &&
            cancelationRulesMeta.timeBeforeArrivalInHours != null &&
            cancelationRulesMeta.minTimeBeforeArrivalInHours != null) {
            const timeLeftBeforeArrival = date_util_1.DateUtil.getDiffHours(now.toISOString(), this.arrivalDate);
            const [refundsAmount, totalAmountToBeTransferred, totalRevenue] = this.computeRefunds(cancelationRulesMeta.cancellationFeeRateSoft);
            if (timeLeftBeforeArrival > cancelationRulesMeta.timeBeforeArrivalInHours) {
                return {
                    strategyType: types_2.RentPeriodStrategyType.SHORT_TERM_RENT,
                    cancelationPolicyType: this._cancelationType,
                    cancelationDate: now.toISOString(),
                    checkOutDate: now.toISOString(),
                    refundsAmountToSender: refundsAmount,
                    transferAmountToRecipient: totalAmountToBeTransferred,
                    transferAmountToPlatform: totalRevenue,
                };
            }
            if (timeLeftBeforeArrival <= cancelationRulesMeta.timeBeforeArrivalInHours &&
                timeLeftBeforeArrival >= cancelationRulesMeta.minTimeBeforeArrivalInHours) {
                const [refundsAmount, totalAmountToBeTransferred, totalRevenue] = this.computeRefunds(cancelationRulesMeta.cancellationFeeRateHard);
                return {
                    strategyType: types_2.RentPeriodStrategyType.SHORT_TERM_RENT,
                    cancelationPolicyType: this._cancelationType,
                    cancelationDate: now.toISOString(),
                    checkOutDate: now.toISOString(),
                    refundsAmountToSender: refundsAmount,
                    transferAmountToRecipient: totalAmountToBeTransferred,
                    transferAmountToPlatform: totalRevenue,
                };
            }
        }
        if (!nowIsStayTime &&
            cancelationRulesMeta.timeBeforeArrivalInHours == null &&
            cancelationRulesMeta.minTimeBeforeArrivalInHours != null) {
            const timeLeftBeforeArrival = date_util_1.DateUtil.getDiffHours(now.toISOString(), this.arrivalDate);
            if (timeLeftBeforeArrival >= cancelationRulesMeta.minTimeBeforeArrivalInHours) {
                const [refundsAmount, totalAmountToBeTransferred, totalRevenue] = this.computeRefunds(cancelationRulesMeta.cancellationFeeRateHard);
                return {
                    strategyType: types_2.RentPeriodStrategyType.SHORT_TERM_RENT,
                    cancelationPolicyType: this._cancelationType,
                    cancelationDate: now.toISOString(),
                    checkOutDate: now.toISOString(),
                    refundsAmountToSender: refundsAmount,
                    transferAmountToRecipient: totalAmountToBeTransferred,
                    transferAmountToPlatform: totalRevenue,
                };
            }
        }
        if (!nowIsStayTime &&
            cancelationRulesMeta.timeBeforeArrivalInHours != null &&
            cancelationRulesMeta.minTimeBeforeArrivalInHours == null) {
            const timeLeftBeforeArrival = date_util_1.DateUtil.getDiffHours(now.toISOString(), this.arrivalDate);
            if (timeLeftBeforeArrival >= cancelationRulesMeta.timeBeforeArrivalInHours) {
                const [refundsAmount, totalAmountToBeTransferred, totalRevenue] = this.computeRefunds(cancelationRulesMeta.cancellationFeeRateSoft);
                return {
                    strategyType: types_2.RentPeriodStrategyType.SHORT_TERM_RENT,
                    cancelationPolicyType: this._cancelationType,
                    cancelationDate: now.toISOString(),
                    checkOutDate: now.toISOString(),
                    refundsAmountToSender: refundsAmount,
                    transferAmountToRecipient: totalAmountToBeTransferred,
                    transferAmountToPlatform: totalRevenue,
                };
            }
            const [refundsAmount, totalAmountToBeTransferred, totalRevenue] = this.computeRefunds(cancelationRulesMeta.cancellationFeeRateHard);
            return {
                strategyType: types_2.RentPeriodStrategyType.SHORT_TERM_RENT,
                cancelationPolicyType: this._cancelationType,
                cancelationDate: now.toISOString(),
                checkOutDate: now.toISOString(),
                refundsAmountToSender: refundsAmount,
                transferAmountToRecipient: totalAmountToBeTransferred,
                transferAmountToPlatform: totalRevenue,
            };
        }
        const [refundsAmount, totalAmountToBeTransferred, totalRevenue] = this.computeRefunds(0);
        return {
            strategyType: types_2.RentPeriodStrategyType.SHORT_TERM_RENT,
            cancelationPolicyType: this._cancelationType,
            cancelationDate: now.toISOString(),
            checkOutDate: now.toISOString(),
            refundsAmountToSender: refundsAmount,
            transferAmountToRecipient: totalAmountToBeTransferred,
            transferAmountToPlatform: totalRevenue,
        };
    }
    computeRefunds(feeRate) {
        const paidTransactions = this.transactions.filter((i) => [types_1.PaymentTransactionStatus.COMPLETED, types_1.PaymentTransactionStatus.CASH_OUT_WAITING].includes(i.status));
        const [refundsAmount, totalAmountToBeTransferred, totalRevenue] = paidTransactions.reduce(([refundAmount, totalAmountToBeTransferred, totalRevenue], { totalAmountPayable, rentDays, cost }) => {
            const senderTaxAmount = this._cancelationByAdmin ? 0 : rentDays * cost.cost * this._senderTaxRate;
            const recipientTaxAmount = this._cancelationByAdmin ? 0 : rentDays * cost.cost * this._recipientTaxRate;
            const totalCost = rentDays * cost.cost;
            const cacheInTax = this._cancelationByAdmin ? 0 : (totalCost + senderTaxAmount) * constants_1.INNOPAY_CASH_IN_TAX_RATE;
            const refundsAmountSum = (refundAmount + (totalAmountPayable - senderTaxAmount - totalAmountPayable * constants_1.INNOPAY_CASH_IN_TAX_RATE)) *
                feeRate;
            const recipientTransferRate = feeRate === 1 ? 0 : feeRate === 0 ? 1 : feeRate;
            const compensationCashOutToRecipient = ((totalCost - recipientTaxAmount) * constants_1.INNOPAY_CASH_OUT_TAX_RATE) / (1 - constants_1.INNOPAY_CASH_OUT_TAX_RATE);
            const currentTotalAmountToBeTransferred = (totalCost - recipientTaxAmount + compensationCashOutToRecipient) * recipientTransferRate;
            const totalAmountToBeTransferredSum = totalAmountToBeTransferred + currentTotalAmountToBeTransferred;
            const totalRevenueSum = totalRevenue +
                ((currentTotalAmountToBeTransferred <= 0 ? 0 : recipientTaxAmount) +
                    senderTaxAmount -
                    (refundsAmountSum ? 0 : cacheInTax) -
                    (currentTotalAmountToBeTransferred <= 0 ? 0 : compensationCashOutToRecipient) * recipientTransferRate);
            return [(0, cost_rounds_util_1.costCeil)(refundsAmountSum), (0, cost_rounds_util_1.costCeil)(totalAmountToBeTransferredSum), (0, cost_rounds_util_1.costFloor)(totalRevenueSum)];
        }, [0, 0, 0]);
        return [refundsAmount, totalAmountToBeTransferred, totalRevenue];
    }
}
exports.ShortTermRentTenantCancelationStrategy = ShortTermRentTenantCancelationStrategy;
//# sourceMappingURL=short-term-rent-tenant-cancelation.strategy.js.map