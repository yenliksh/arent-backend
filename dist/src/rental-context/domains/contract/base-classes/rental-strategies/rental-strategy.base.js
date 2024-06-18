"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalStrategyBase = void 0;
const date_util_1 = require("../../../../../libs/utils/date-util");
const rental_date_guard_1 = require("../rental-guards/rental-date.guard");
class RentalStrategyBase {
    constructor(contract) {
        this.contract = contract;
        this.dateGuard = new rental_date_guard_1.RentalDateGuard(contract.rentPeriodVersion, contract.status.value);
    }
    get now() {
        return date_util_1.DateUtil.utcNow().millisecond(0).toISOString();
    }
    getRentDays({ arrivalDate, departureDate }) {
        return Math.ceil(date_util_1.DateUtil.getDiffBetweenTwoDatesUTC(arrivalDate, departureDate, 'days', true));
    }
    getStayDates({ arrivalDate, departureDate }) {
        const rentMonths = date_util_1.DateUtil.getDiffBetweenTwoDatesUTC(arrivalDate, departureDate, 'months', true);
        const stayDates = new Array(Math.ceil(rentMonths)).fill(undefined).reduce((acc, _, index) => {
            const startDate = acc[acc.length - 1] ? acc[acc.length - 1].endDate : arrivalDate;
            const currentRentMonth = index + 1;
            if (currentRentMonth > rentMonths) {
                acc.push({ startDate, endDate: departureDate });
                return acc;
            }
            const endDate = date_util_1.DateUtil.parse(arrivalDate).add(currentRentMonth, 'month').toISOString();
            acc.push({ startDate, endDate });
            return acc;
        }, []);
        return stayDates;
    }
}
exports.RentalStrategyBase = RentalStrategyBase;
//# sourceMappingURL=rental-strategy.base.js.map