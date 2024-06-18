"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentManager = void 0;
const rental_date_guard_1 = require("../rental-guards/rental-date.guard");
const long_term_rent_strategy_1 = require("../rental-strategies/long-term-rent-strategy/long-term-rent.strategy");
const middle_term_rent_strategy_1 = require("../rental-strategies/middle-term-rent-strategy/middle-term-rent.strategy");
const short_term_rent_strategy_1 = require("../rental-strategies/short-term-rent-strategy/short-term-rent.strategy");
const types_1 = require("./types");
class PaymentManager {
    constructor(strategy) {
        this._strategy = strategy;
    }
    get strategy() {
        return this._strategy;
    }
    generate() {
        return this._strategy.handle();
    }
    static defineStrategy(contract) {
        const strategyMapper = {
            [types_1.RentPeriodStrategyType.SHORT_TERM_RENT]: (contract, paymentType) => new short_term_rent_strategy_1.ShortTermRentStrategy({ contract, paymentType }),
            [types_1.RentPeriodStrategyType.MIDDLE_TERM_RENT]: (contract) => new middle_term_rent_strategy_1.MiddleTermRentStrategy({ contract }),
            [types_1.RentPeriodStrategyType.LONG_TERM_RENT]: (contract) => new long_term_rent_strategy_1.LongTermRentStrategy({ contract }),
        };
        const rentalDateGuard = new rental_date_guard_1.RentalDateGuard(contract.rentPeriodVersion, contract.status.value);
        const paymentStrategyType = rentalDateGuard.defineRentPeriodStrategyType({
            arrivalDate: contract.arrivalDateOrFail,
            departureDate: contract.departureDateOrFail,
        });
        return strategyMapper[paymentStrategyType](contract, contract.paymentType);
    }
}
exports.PaymentManager = PaymentManager;
//# sourceMappingURL=rental.manager.js.map