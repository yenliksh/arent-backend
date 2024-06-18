"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentPeriodTypeVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const exceptions_1 = require("../../../../../libs/exceptions");
const types_1 = require("../types");
class RentPeriodTypeVO extends value_object_base_1.ValueObject {
    static create(type) {
        return new RentPeriodTypeVO({ value: type });
    }
    get value() {
        return this.props.value;
    }
    validate({ value }) {
        if (value && !guard_1.Guard.isValidEnum(value, types_1.RentPeriodType)) {
            throw new exceptions_1.ArgumentInvalidException('Unexpected rent period type');
        }
    }
}
exports.RentPeriodTypeVO = RentPeriodTypeVO;
//# sourceMappingURL=rent-period-type.value-object.js.map