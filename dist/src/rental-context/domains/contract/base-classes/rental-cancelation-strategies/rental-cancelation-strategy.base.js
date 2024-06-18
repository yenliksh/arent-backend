"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalCancelationStrategyBase = void 0;
const date_util_1 = require("../../../../../libs/utils/date-util");
const rental_date_guard_1 = require("../rental-guards/rental-date.guard");
class RentalCancelationStrategyBase {
    constructor(contract) {
        this.contract = contract;
        this._cancelationByAdmin = false;
        this.dateGuard = new rental_date_guard_1.RentalDateGuard(contract.rentPeriodVersion, contract.status.value);
    }
    cancelByAdmin() {
        this._cancelationByAdmin = true;
    }
    get bookingDate() {
        return this.transactions[0].createdAt.value.toISOString();
    }
    getRentDays({ arrivalDate, departureDate }) {
        return Math.ceil(date_util_1.DateUtil.getDiffBetweenTwoDatesUTC(arrivalDate, departureDate, 'days', true));
    }
}
exports.RentalCancelationStrategyBase = RentalCancelationStrategyBase;
//# sourceMappingURL=rental-cancelation-strategy.base.js.map