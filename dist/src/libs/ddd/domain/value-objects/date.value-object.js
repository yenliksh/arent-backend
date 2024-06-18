"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateVO = void 0;
const exceptions_1 = require("../../../exceptions");
const value_object_base_1 = require("../base-classes/value-object.base");
class DateVO extends value_object_base_1.ValueObject {
    constructor(value) {
        const date = new Date(value);
        super({ value: date });
    }
    get value() {
        return this.props.value;
    }
    static now() {
        return new DateVO(Date.now());
    }
    validate({ value }) {
        if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
            throw new exceptions_1.ArgumentInvalidException('Incorrect date');
        }
    }
}
exports.DateVO = DateVO;
//# sourceMappingURL=date.value-object.js.map