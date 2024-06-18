"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalManagerFactory = void 0;
const rental_manager_1 = require("../../../rental-manager/rental.manager");
const types_1 = require("../../../rental-manager/types");
const long_term_rent_strategy_1 = require("../../long-term-rent-strategy/long-term-rent.strategy");
const middle_term_rent_strategy_1 = require("../../middle-term-rent-strategy/middle-term-rent.strategy");
const short_term_rent_strategy_1 = require("../../short-term-rent-strategy/short-term-rent.strategy");
const contract_rental_strategy_factory_1 = require("./contract-rental-strategy.factory");
const rentalManagerFactory = (contractCreateProps, rentPeriodStrategyType, shortTermRentPaymentMethodType) => {
    const contract = (0, contract_rental_strategy_factory_1.contractRentalStrategyFactory)(contractCreateProps);
    const strategyMap = {
        [types_1.RentPeriodStrategyType.SHORT_TERM_RENT]: () => new short_term_rent_strategy_1.ShortTermRentStrategy({ contract, paymentType: shortTermRentPaymentMethodType }),
        [types_1.RentPeriodStrategyType.MIDDLE_TERM_RENT]: () => new middle_term_rent_strategy_1.MiddleTermRentStrategy({ contract }),
        [types_1.RentPeriodStrategyType.LONG_TERM_RENT]: () => new long_term_rent_strategy_1.LongTermRentStrategy({ contract }),
    };
    const strategy = strategyMap[rentPeriodStrategyType]();
    const payment = new rental_manager_1.PaymentManager(strategy);
    return payment;
};
exports.rentalManagerFactory = rentalManagerFactory;
//# sourceMappingURL=rental-manager.factory.js.map