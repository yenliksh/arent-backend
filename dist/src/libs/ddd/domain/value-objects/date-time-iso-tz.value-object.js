"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeISOTZVO = void 0;
const date_util_1 = require("../../../utils/date-util");
const class_validator_1 = require("class-validator");
const exceptions_1 = require("../../../exceptions");
const value_object_base_1 = require("../base-classes/value-object.base");
class DateTimeISOTZVO extends value_object_base_1.ValueObject {
    constructor(value) {
        const date = value ? date_util_1.DateUtil.parse(value) : date_util_1.DateUtil.utcNow();
        super({ value: date.toISOString() });
    }
    getDate() {
        return new Date(this.props.value);
    }
    get value() {
        return this.props.value;
    }
    validate({ value }) {
        if (value.length !== 24 ||
            !(0, class_validator_1.isISO8601)(value, {
                strict: true,
            }) ||
            !value.endsWith('000Z')) {
            throw new exceptions_1.ArgumentInvalidException('string is not in iso format ex. YYYY-MM-DDThh:mm:ss.000Z');
        }
    }
}
exports.DateTimeISOTZVO = DateTimeISOTZVO;
//# sourceMappingURL=date-time-iso-tz.value-object.js.map