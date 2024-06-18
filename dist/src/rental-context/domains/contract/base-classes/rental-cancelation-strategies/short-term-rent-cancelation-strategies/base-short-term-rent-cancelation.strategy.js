"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseShortTermRentCancelationStrategy = void 0;
const enums_1 = require("../../../../../../infrastructure/enums");
const exceptions_1 = require("../../../../../../libs/exceptions");
const illegal_operation_exception_1 = require("../../../../../../libs/exceptions/illegal-operation.exception");
const common_1 = require("@nestjs/common");
const types_1 = require("../../rental-manager/types");
const common_short_middle_term_rent_landlord_cancelation_stratiegy_1 = require("../common/common-short-middle-term-rent-landlord-cancelation.stratiegy");
class BaseShortTermRentCancelationStrategy extends common_short_middle_term_rent_landlord_cancelation_stratiegy_1.CommonShortMiddleTermRentLandlordCancelationStrategy {
    constructor(contract, transactions) {
        super(contract, transactions);
        this.contract = contract;
        this.transactions = transactions;
        this.cancelType = types_1.RentPeriodStrategyType.SHORT_TERM_RENT;
        this.logger = new common_1.Logger('ShortTermRentCancelationStrategy');
        if (transactions.some((i) => i.contractId.value !== contract.id.value)) {
            throw new illegal_operation_exception_1.IllegalOperationException('Transactions is not related with contract');
        }
        if (contract.apartmentRentPeriodType !== enums_1.ApartmentRentPeriodType.SHORT_TERM) {
            const errorMessage = 'Contract must have contain short term rent period type';
            throw new exceptions_1.ArgumentInvalidException(errorMessage);
        }
        if (!contract.cancellationPolicy.shortTermCancellationPolicy) {
            const errorMessage = 'Contract must have contain short term cancelation policy';
            throw new exceptions_1.ArgumentInvalidException(errorMessage);
        }
        if (!contract.paymentType) {
            const errorMessage = 'Contract must have contain short term payment type';
            throw new exceptions_1.ArgumentInvalidException(errorMessage);
        }
        this._cancelationType = contract.cancellationPolicy.shortTermCancellationPolicy;
        this.dateGuard.validateOrThrowError({ arrivalDate: this.arrivalDate, departureDate: this.departureDate }, types_1.RentPeriodStrategyType.SHORT_TERM_RENT);
    }
}
exports.BaseShortTermRentCancelationStrategy = BaseShortTermRentCancelationStrategy;
//# sourceMappingURL=base-short-term-rent-cancelation.strategy.js.map