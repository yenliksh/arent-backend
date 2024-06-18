"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuarantorVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const exceptions_1 = require("../../../../../libs/exceptions");
const user_guard_1 = require("../user.guard");
class GuarantorVO extends value_object_base_1.ValueObject {
    constructor({ phone, firstName, lastName }) {
        super({ phone, firstName, lastName });
    }
    validate(props) {
        const { phone, firstName, lastName } = props;
        const fields = [phone, firstName, lastName];
        if (fields.some((f) => f == null)) {
            throw new exceptions_1.ArgumentInvalidException('Guarantor must to complete all required fields');
        }
        if (!guard_1.Guard.lengthIsBetween(phone, 8, 16)) {
            throw new exceptions_1.ArgumentOutOfRangeException('Phone number length out of the range');
        }
        if (!user_guard_1.UserGuard.isPhoneNumber(phone)) {
            throw new exceptions_1.ArgumentInvalidException('Phone number has incorrect format');
        }
        if (!guard_1.Guard.lengthIsBetween(firstName, 1, 100)) {
            throw new exceptions_1.ArgumentOutOfRangeException('First name must be a range from 1 to 100');
        }
        if (!guard_1.Guard.lengthIsBetween(lastName, 1, 100)) {
            throw new exceptions_1.ArgumentOutOfRangeException('Last name must be a range from 1 to 100');
        }
    }
}
exports.GuarantorVO = GuarantorVO;
//# sourceMappingURL=guarantor.value-object.js.map