"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractDetailsVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const exceptions_1 = require("../../../../../libs/exceptions");
const illegal_operation_exception_1 = require("../../../../../libs/exceptions/illegal-operation.exception");
class ContractDetailsVO extends value_object_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    decreaseDepartureDate(newDepartureDate) {
        const { arrivalDate, departureDate } = this.props;
        if (!arrivalDate || !departureDate) {
            throw new illegal_operation_exception_1.IllegalOperationException('You can decrease departure date only if arrival date and departure date exists');
        }
        if (departureDate.getDate().getTime() <= newDepartureDate.getDate().getTime()) {
            throw new exceptions_1.ArgumentInvalidException('New departure date must be less than old departure date');
        }
        this.props.departureDate = newDepartureDate;
    }
    get arrivalDate() {
        return this.props.arrivalDate;
    }
    get departureDate() {
        return this.props.departureDate;
    }
    get rules() {
        return this.props.rules;
    }
    validate(props) {
        const { departureDate, arrivalDate } = props;
        if (departureDate && arrivalDate && !guard_1.Guard.isDateMoreThan(arrivalDate.value, departureDate.value)) {
            throw new exceptions_1.ArgumentInvalidException('End date must be more that start date');
        }
    }
}
exports.ContractDetailsVO = ContractDetailsVO;
//# sourceMappingURL=contract-details.value-object.js.map