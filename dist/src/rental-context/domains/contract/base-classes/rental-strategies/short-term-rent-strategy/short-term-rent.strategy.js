"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortTermRentStrategy = void 0;
const enums_1 = require("../../../../../../infrastructure/enums");
const exceptions_1 = require("../../../../../../libs/exceptions");
const date_util_1 = require("../../../../../../libs/utils/date-util");
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../../constants");
const rental_date_guard_1 = require("../../rental-guards/rental-date.guard");
const types_1 = require("../../rental-manager/types");
const rental_strategy_base_1 = require("../rental-strategy.base");
const cost_rounds_util_1 = require("../utils/cost-rounds.util");
class ShortTermRentStrategy extends rental_strategy_base_1.RentalStrategyBase {
    constructor({ contract, paymentType }) {
        super(contract);
        this._senderTaxRate = constants_1.LIVIN_SHORT_TERM_RENT_SENDER_TAX_RATE;
        this._recipientTaxRate = constants_1.LIVIN_SHORT_TERM_RENT_RECIPIENT_TAX_RATE;
        this._paymentType = enums_1.ShortTermRentPaymentType.FULL;
        this._daysBeforeArrivalForSecondWithdrawal = 14;
        this.strategyMap = {
            [enums_1.ShortTermRentPaymentType.FULL]: this.generateFullPayment.bind(this),
            [enums_1.ShortTermRentPaymentType.PARTIAL]: this.generatePartialPayments.bind(this),
        };
        this.logger = new common_1.Logger('ShortTermRentStrategy');
        if (paymentType) {
            this._paymentType = paymentType;
        }
        if (contract.isFined) {
            this._recipientTaxRate += constants_1.FINE_RATE;
        }
    }
    handle() {
        return this.strategyMap[this._paymentType]();
    }
    generateFullPayment() {
        var _a, _b, _c;
        const cost = (_a = this.contract.costAndCurrency) === null || _a === void 0 ? void 0 : _a.cost;
        const arrivalDate = (_b = this.contract.arrivalDate) === null || _b === void 0 ? void 0 : _b.value;
        const departureDate = (_c = this.contract.departureDate) === null || _c === void 0 ? void 0 : _c.value;
        if (!cost || !arrivalDate || !departureDate) {
            const errorMessage = 'Generate full payment cannot be invoked without required fields';
            throw new exceptions_1.ArgumentInvalidException(errorMessage);
        }
        this.dateGuard.validateOrThrowError({ arrivalDate, departureDate }, types_1.RentPeriodStrategyType.SHORT_TERM_RENT);
        const rentDays = this.getRentDays({ arrivalDate, departureDate });
        const senderTaxAmount = rentDays * cost * this._senderTaxRate;
        const totalAmountPayable = rentDays * cost + senderTaxAmount;
        const totalAmountToBeTransferred = (rentDays * cost * (1 - this._recipientTaxRate)) / (1 - constants_1.INNOPAY_CASH_OUT_TAX_RATE);
        const totalRevenue = totalAmountPayable - totalAmountToBeTransferred - totalAmountPayable * constants_1.INNOPAY_CASH_IN_TAX_RATE;
        return {
            data: [
                {
                    taxAmount: (0, cost_rounds_util_1.costCeil)(senderTaxAmount),
                    rentDays,
                    cost,
                    withdrawFundsDate: this.now,
                    totalAmountPayable: (0, cost_rounds_util_1.costCeil)(totalAmountPayable),
                    totalAmountToBeTransferred: (0, cost_rounds_util_1.costCeil)(totalAmountToBeTransferred),
                    totalRevenue: (0, cost_rounds_util_1.costFloor)(totalRevenue),
                    senderTaxRate: this._senderTaxRate,
                    recipientTaxRate: this._recipientTaxRate,
                    startDate: arrivalDate,
                    endDate: departureDate,
                    isRecurring: false,
                    isLastPayment: false,
                    rentPeriodStrategyType: types_1.RentPeriodStrategyType.SHORT_TERM_RENT,
                },
            ],
        };
    }
    generatePartialPayments() {
        var _a, _b, _c;
        const cost = (_a = this.contract.costAndCurrency) === null || _a === void 0 ? void 0 : _a.cost;
        const arrivalDate = (_b = this.contract.arrivalDate) === null || _b === void 0 ? void 0 : _b.value;
        const departureDate = (_c = this.contract.departureDate) === null || _c === void 0 ? void 0 : _c.value;
        if (!cost || !arrivalDate || !departureDate) {
            const errorMessage = 'Generate partial payment cannot be invoked without required fields';
            throw new exceptions_1.ArgumentInvalidException(errorMessage);
        }
        rental_date_guard_1.RentalDateGuard.mustBeDaysBeforeArrival(date_util_1.DateUtil.utcNow().toISOString(), arrivalDate, constants_1.SHORT_RENT_PARTIAL_ALLOWED_DAYS_BEFORE_ARRIVAL);
        this.dateGuard.validateOrThrowError({ arrivalDate, departureDate }, types_1.RentPeriodStrategyType.SHORT_TERM_RENT);
        const rentDays = this.getRentDays({ arrivalDate, departureDate });
        const halfCost = (rentDays * cost) / 2;
        const senderTaxAmount = halfCost * this._senderTaxRate;
        const totalAmountPayable = halfCost + senderTaxAmount;
        const totalAmountToBeTransferred = (halfCost * (1 - this._recipientTaxRate)) / (1 - constants_1.INNOPAY_CASH_OUT_TAX_RATE);
        const totalRevenue = totalAmountPayable - totalAmountToBeTransferred - totalAmountPayable * constants_1.INNOPAY_CASH_IN_TAX_RATE;
        const withdrawFundsSecondDate = date_util_1.DateUtil.parseUTC(arrivalDate)
            .subtract(this._daysBeforeArrivalForSecondWithdrawal, 'days')
            .startOf('day')
            .add(6, 'hours')
            .toISOString();
        return {
            data: [
                {
                    taxAmount: (0, cost_rounds_util_1.costCeil)(senderTaxAmount),
                    rentDays,
                    cost: (0, cost_rounds_util_1.costCeil)(cost / 2),
                    withdrawFundsDate: this.now,
                    totalAmountPayable: (0, cost_rounds_util_1.costCeil)(totalAmountPayable),
                    totalAmountToBeTransferred: (0, cost_rounds_util_1.costCeil)(totalAmountToBeTransferred),
                    totalRevenue: (0, cost_rounds_util_1.costFloor)(totalRevenue),
                    senderTaxRate: this._senderTaxRate,
                    recipientTaxRate: this._recipientTaxRate,
                    startDate: arrivalDate,
                    endDate: departureDate,
                    isRecurring: false,
                    isLastPayment: false,
                    rentPeriodStrategyType: types_1.RentPeriodStrategyType.SHORT_TERM_RENT,
                },
                {
                    taxAmount: senderTaxAmount,
                    rentDays,
                    cost: (0, cost_rounds_util_1.costCeil)(cost / 2),
                    withdrawFundsDate: withdrawFundsSecondDate,
                    totalAmountPayable: (0, cost_rounds_util_1.costCeil)(totalAmountPayable),
                    totalAmountToBeTransferred: (0, cost_rounds_util_1.costCeil)(totalAmountToBeTransferred),
                    totalRevenue: (0, cost_rounds_util_1.costFloor)(totalRevenue),
                    senderTaxRate: this._senderTaxRate,
                    recipientTaxRate: this._recipientTaxRate,
                    startDate: arrivalDate,
                    endDate: departureDate,
                    isRecurring: true,
                    isLastPayment: true,
                    rentPeriodStrategyType: types_1.RentPeriodStrategyType.SHORT_TERM_RENT,
                },
            ],
        };
    }
}
exports.ShortTermRentStrategy = ShortTermRentStrategy;
//# sourceMappingURL=short-term-rent.strategy.js.map