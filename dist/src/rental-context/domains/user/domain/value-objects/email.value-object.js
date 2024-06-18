"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const exceptions_1 = require("../../../../../libs/exceptions");
const user_guard_1 = require("../user.guard");
class EmailVO extends value_object_base_1.ValueObject {
    constructor(value) {
        super({ value });
        this.props.value = EmailVO.format(value);
    }
    get value() {
        return this.props.value;
    }
    validate({ value }) {
        if (!guard_1.Guard.lengthIsBetween(value, 5, 320)) {
            throw new exceptions_1.ArgumentOutOfRangeException('Email');
        }
        if (!user_guard_1.UserGuard.isEmail(value)) {
            throw new exceptions_1.ArgumentInvalidException('Email has incorrect format');
        }
    }
    static format(email) {
        return email.trim().toLowerCase();
    }
}
exports.EmailVO = EmailVO;
//# sourceMappingURL=email.value-object.js.map