"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RejectReasonVO = void 0;
const value_object_base_1 = require("../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../libs/ddd/domain/guard");
const exceptions_1 = require("../../libs/exceptions");
class RejectReasonVO extends value_object_base_1.ValueObject {
    constructor(value) {
        super({ value });
        this.props.value = RejectReasonVO.format(value);
    }
    get value() {
        return this.props.value;
    }
    validate({ value }) {
        if (!guard_1.Guard.lengthIsBetween(value, 1, 500)) {
            throw new exceptions_1.ArgumentOutOfRangeException('Reason must be a range from 1 to 500');
        }
    }
    static format(value) {
        const trimmedValue = value.trim();
        return trimmedValue.charAt(0).toUpperCase() + trimmedValue.slice(1);
    }
}
exports.RejectReasonVO = RejectReasonVO;
//# sourceMappingURL=reject-reason.value-object.js.map