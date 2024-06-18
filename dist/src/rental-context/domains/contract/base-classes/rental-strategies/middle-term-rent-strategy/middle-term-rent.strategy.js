"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddleTermRentStrategy = void 0;
const exceptions_1 = require("../../../../../../libs/exceptions");
const date_util_1 = require("../../../../../../libs/utils/date-util");
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../../constants");
const types_1 = require("../../rental-manager/types");
const rental_strategy_base_1 = require("../rental-strategy.base");
const cost_rounds_util_1 = require("../utils/cost-rounds.util");
class MiddleTermRentStrategy extends rental_strategy_base_1.RentalStrategyBase {
    constructor({ contract }) {
        super(contract);
        this._senderTaxRate = constants_1.LIVIN_SHORT_TERM_RENT_SENDER_TAX_RATE;
        this._recipientTaxRate = constants_1.LIVIN_SHORT_TERM_RENT_RECIPIENT_TAX_RATE;
        this._daysBeforeOfWithdrawSubsequentRents = 3;
        this.logger = new common_1.Logger('MiddleTermRentStrategy');
        if (contract.isFined) {
            this._recipientTaxRate += constants_1.FINE_RATE;
        }
    }
    handle() {
        var _a, _b, _c;
        const cost = (_a = this.contract.costAndCurrency) === null || _a === void 0 ? void 0 : _a.cost;
        const arrivalDate = (_b = this.contract.arrivalDate) === null || _b === void 0 ? void 0 : _b.value;
        const departureDate = (_c = this.contract.departureDate) === null || _c === void 0 ? void 0 : _c.value;
        if (!cost || !arrivalDate || !departureDate) {
            const errorMessage = 'Generate partial payment cannot be invoked without required fields';
            throw new exceptions_1.ArgumentInvalidException(errorMessage);
        }
        this.dateGuard.validateOrThrowError({ arrivalDate, departureDate }, types_1.RentPeriodStrategyType.MIDDLE_TERM_RENT);
        const stayDates = this.getStayDates({ arrivalDate, departureDate });
        return {
            data: stayDates.map(({ startDate, endDate }, index) => {
                const rentDays = this.getRentDays({ arrivalDate: startDate, departureDate: endDate });
                const senderTaxAmount = rentDays * cost * this._senderTaxRate;
                const totalAmountPayable = rentDays * cost + senderTaxAmount;
                const totalAmountToBeTransferred = (rentDays * cost * (1 - this._recipientTaxRate)) / (1 - constants_1.INNOPAY_CASH_OUT_TAX_RATE);
                const totalRevenue = totalAmountPayable - totalAmountToBeTransferred - totalAmountPayable * constants_1.INNOPAY_CASH_IN_TAX_RATE;
                const withdrawFundsDate = index
                    ? date_util_1.DateUtil.parseUTC(startDate)
                        .subtract(this._daysBeforeOfWithdrawSubsequentRents, 'day')
                        .startOf('day')
                        .add(6, 'hours')
                        .toISOString()
                    : this.now;
                return {
                    taxAmount: (0, cost_rounds_util_1.costCeil)(senderTaxAmount),
                    rentDays,
                    cost: cost,
                    withdrawFundsDate,
                    totalAmountPayable: (0, cost_rounds_util_1.costCeil)(totalAmountPayable),
                    totalAmountToBeTransferred: (0, cost_rounds_util_1.costCeil)(totalAmountToBeTransferred),
                    totalRevenue: (0, cost_rounds_util_1.costFloor)(totalRevenue),
                    senderTaxRate: this._senderTaxRate,
                    recipientTaxRate: this._recipientTaxRate,
                    startDate: startDate,
                    endDate: endDate,
                    isRecurring: !!index,
                    isLastPayment: index === stayDates.length - 1,
                    rentPeriodStrategyType: types_1.RentPeriodStrategyType.MIDDLE_TERM_RENT,
                };
            }),
        };
    }
}
exports.MiddleTermRentStrategy = MiddleTermRentStrategy;
//# sourceMappingURL=middle-term-rent.strategy.js.map