"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortTermRentBookingTypeVO = void 0;
const enums_1 = require("../../infrastructure/enums");
const value_object_base_1 = require("../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../libs/ddd/domain/guard");
const exceptions_1 = require("../../libs/exceptions");
class ShortTermRentBookingTypeVO extends value_object_base_1.ValueObject {
    static create(type) {
        return new ShortTermRentBookingTypeVO({ value: type });
    }
    get value() {
        return this.props.value;
    }
    validate({ value }) {
        if (value && !guard_1.Guard.isValidEnum(value, enums_1.ShortTermRentBookingType)) {
            throw new exceptions_1.ArgumentInvalidException('Unexpected apartment type');
        }
    }
}
exports.ShortTermRentBookingTypeVO = ShortTermRentBookingTypeVO;
//# sourceMappingURL=rent-booking-type.value-object.js.map