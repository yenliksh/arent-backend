"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseMiddleTermRentCancelationStrategy = void 0;
const enums_1 = require("../../../../../../infrastructure/enums");
const exceptions_1 = require("../../../../../../libs/exceptions");
const illegal_operation_exception_1 = require("../../../../../../libs/exceptions/illegal-operation.exception");
const common_1 = require("@nestjs/common");
const types_1 = require("../../rental-manager/types");
const common_short_middle_term_rent_landlord_cancelation_stratiegy_1 = require("../common/common-short-middle-term-rent-landlord-cancelation.stratiegy");
class BaseMiddleTermRentCancelationStrategy extends common_short_middle_term_rent_landlord_cancelation_stratiegy_1.CommonShortMiddleTermRentLandlordCancelationStrategy {
    constructor(contract, transactions) {
        super(contract, transactions);
        this.contract = contract;
        this.transactions = transactions;
        this.cancelType = types_1.RentPeriodStrategyType.MIDDLE_TERM_RENT;
        this.logger = new common_1.Logger('MiddleTermRentCancelationStrategy');
        if (transactions.some((i) => i.contractId.value !== contract.id.value)) {
            throw new illegal_operation_exception_1.IllegalOperationException('Transactions is not related with contract');
        }
        if (contract.apartmentRentPeriodType !== enums_1.ApartmentRentPeriodType.SHORT_TERM) {
            const errorMessage = 'Contract must have contain short term rent period type';
            throw new exceptions_1.ArgumentInvalidException(errorMessage);
        }
        this.dateGuard.validateOrThrowError({ arrivalDate: this.arrivalDate, departureDate: this.departureDate }, types_1.RentPeriodStrategyType.MIDDLE_TERM_RENT);
    }
}
exports.BaseMiddleTermRentCancelationStrategy = BaseMiddleTermRentCancelationStrategy;
//# sourceMappingURL=base-middle-term-rent-cancelation.strategy.js.map