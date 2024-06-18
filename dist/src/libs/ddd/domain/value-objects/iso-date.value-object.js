"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateISOVO = void 0;
const class_validator_1 = require("class-validator");
const exceptions_1 = require("../../../exceptions");
const value_object_base_1 = require("../base-classes/value-object.base");
class DateISOVO extends value_object_base_1.ValueObject {
    constructor(value) {
        super({ value });
    }
    get value() {
        return this.props.value;
    }
    validate({ value }) {
        if (value.length !== 10 ||
            !(0, class_validator_1.isISO8601)(value, {
                strict: true,
            })) {
            throw new exceptions_1.ArgumentInvalidException('string is not in iso format ex. YYYY-MM-DD');
        }
    }
}
exports.DateISOVO = DateISOVO;
//# sourceMappingURL=iso-date.value-object.js.map