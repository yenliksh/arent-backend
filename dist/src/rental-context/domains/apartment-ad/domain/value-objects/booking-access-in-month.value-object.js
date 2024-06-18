"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingAccessInMonthVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const exceptions_1 = require("../../../../../libs/exceptions");
class BookingAccessInMonthVO extends value_object_base_1.ValueObject {
    get value() {
        return this.props.value;
    }
    validate(props) {
        const { value } = props;
        const validNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        if (!validNumbers.includes(value)) {
            throw new exceptions_1.ArgumentInvalidException('Unexpected booking access in month value');
        }
    }
}
exports.BookingAccessInMonthVO = BookingAccessInMonthVO;
//# sourceMappingURL=booking-access-in-month.value-object.js.map