"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortTermRentPaymentTypeVO = void 0;
const enums_1 = require("../../infrastructure/enums");
const value_object_base_1 = require("../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../libs/ddd/domain/guard");
const exceptions_1 = require("../../libs/exceptions");
class ShortTermRentPaymentTypeVO extends value_object_base_1.ValueObject {
    static create(type) {
        return new ShortTermRentPaymentTypeVO({ value: type });
    }
    get value() {
        return this.props.value;
    }
    validate({ value }) {
        if (value && !guard_1.Guard.isValidEnum(value, enums_1.ShortTermRentPaymentType)) {
            throw new exceptions_1.ArgumentInvalidException('Unexpected apartment type');
        }
    }
}
exports.ShortTermRentPaymentTypeVO = ShortTermRentPaymentTypeVO;
//# sourceMappingURL=short-term-rent-payment-type.value-object.js.map