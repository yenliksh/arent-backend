"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongTermRentCancellationPolicyVO = void 0;
const enums_1 = require("../../../../../infrastructure/enums");
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const exceptions_1 = require("../../../../../libs/exceptions");
class LongTermRentCancellationPolicyVO extends value_object_base_1.ValueObject {
    static create(type) {
        return new LongTermRentCancellationPolicyVO({ value: type });
    }
    get value() {
        return this.props.value;
    }
    validate(props) {
        if (!guard_1.Guard.isValidEnum(props.value, enums_1.LongTermRentCancellationPolicyType)) {
            throw new exceptions_1.ArgumentInvalidException('Long term rent cancellation policy type is not valid');
        }
    }
}
exports.LongTermRentCancellationPolicyVO = LongTermRentCancellationPolicyVO;
//# sourceMappingURL=long-term-rent-cancellation-policy.value-object.js.map