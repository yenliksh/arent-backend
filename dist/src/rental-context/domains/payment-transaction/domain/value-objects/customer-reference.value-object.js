"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerReferenceVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const exceptions_1 = require("../../../../../libs/exceptions");
const class_validator_1 = require("class-validator");
class CustomerReferenceVO extends value_object_base_1.ValueObject {
    constructor(value) {
        super(value);
    }
    get value() {
        return {
            customerReference: this.props.customerReference,
            livinCustomerReference: this.props.livinCustomerReference,
        };
    }
    validate(value) {
        if (typeof value.customerReference !== 'string' ||
            !(0, class_validator_1.isNumberString)(value.customerReference) ||
            (value.livinCustomerReference && typeof value.livinCustomerReference !== 'string') ||
            (value.livinCustomerReference && !(0, class_validator_1.isNumberString)(value.livinCustomerReference))) {
            throw new exceptions_1.ArgumentInvalidException('customer reference has incorrect type');
        }
    }
}
exports.CustomerReferenceVO = CustomerReferenceVO;
//# sourceMappingURL=customer-reference.value-object.js.map