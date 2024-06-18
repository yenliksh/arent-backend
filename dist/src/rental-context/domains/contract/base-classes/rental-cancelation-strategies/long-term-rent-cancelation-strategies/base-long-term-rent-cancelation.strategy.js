"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseLongTermRentCancelationStrategy = void 0;
const enums_1 = require("../../../../../../infrastructure/enums");
const exceptions_1 = require("../../../../../../libs/exceptions");
const illegal_operation_exception_1 = require("../../../../../../libs/exceptions/illegal-operation.exception");
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../../constants");
const types_1 = require("../../rental-manager/types");
const rental_cancelation_strategy_base_1 = require("../rental-cancelation-strategy.base");
class BaseLongTermRentCancelationStrategy extends rental_cancelation_strategy_base_1.RentalCancelationStrategyBase {
    constructor(contract, transactions) {
        var _a, _b;
        super(contract);
        this.contract = contract;
        this.transactions = transactions;
        this._senderTaxRate = constants_1.LIVIN_LONG_TERM_RENT_SENDER_TAX_RATE;
        this._recipientTaxRate = constants_1.LIVIN_LONG_TERM_RENT_RECIPIENT_TAX_RATE;
        this.logger = new common_1.Logger('LongTermRentCancelationStrategy');
        if (transactions.some((i) => i.contractId.value !== contract.id.value)) {
            throw new illegal_operation_exception_1.IllegalOperationException('Transactions is not related with contract');
        }
        if (contract.apartmentRentPeriodType !== enums_1.ApartmentRentPeriodType.LONG_TERM) {
            const errorMessage = 'Contract must have contain long term rent period type';
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
        this.dateGuard.validateOrThrowError({ arrivalDate, departureDate }, types_1.RentPeriodStrategyType.LONG_TERM_RENT);
        if (contract.isFined) {
            this._recipientTaxRate += constants_1.FINE_RATE;
        }
    }
}
exports.BaseLongTermRentCancelationStrategy = BaseLongTermRentCancelationStrategy;
//# sourceMappingURL=base-long-term-rent-cancelation.strategy.js.map