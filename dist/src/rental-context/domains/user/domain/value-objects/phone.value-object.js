"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const exceptions_1 = require("../../../../../libs/exceptions");
const user_guard_1 = require("../user.guard");
class PhoneVO extends value_object_base_1.ValueObject {
    constructor(value) {
        super({ value });
        this.props.value = PhoneVO.format(value);
    }
    get value() {
        return this.props.value;
    }
    validate({ value }) {
        if (!guard_1.Guard.lengthIsBetween(value, 8, 16)) {
            throw new exceptions_1.ArgumentOutOfRangeException('Phone number length out of the range');
        }
        if (!user_guard_1.UserGuard.isPhoneNumber(value)) {
            throw new exceptions_1.ArgumentInvalidException('Phone number has incorrect format');
        }
    }
    static format(email) {
        return email.trim();
    }
}
exports.PhoneVO = PhoneVO;
//# sourceMappingURL=phone.value-object.js.map