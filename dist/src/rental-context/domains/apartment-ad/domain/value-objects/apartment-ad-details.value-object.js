"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdDetailsVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const exceptions_1 = require("../../../../../libs/exceptions");
const apartment_ad_guard_1 = require("../apartment-ad.guard");
class ApartmentAdDetailsVO extends value_object_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create({ numberOfGuests, numberOfRooms }) {
        return new ApartmentAdDetailsVO({
            numberOfGuests,
            numberOfRooms,
        });
    }
    get numberOfGuests() {
        return this.props.numberOfGuests;
    }
    validate(props) {
        if (props.numberOfGuests && !guard_1.Guard.isPositiveNumber(props.numberOfGuests)) {
            throw new exceptions_1.ArgumentInvalidException('Number of guests is negative');
        }
        if (props.numberOfRooms && guard_1.Guard.isNegative(props.numberOfRooms)) {
            throw new exceptions_1.ArgumentInvalidException('Number of rooms is negative');
        }
        if (props.numberOfRooms && !apartment_ad_guard_1.ApartmentAdGuard.isNumberOfRooms(props.numberOfRooms)) {
            throw new exceptions_1.ArgumentOutOfRangeException('Number of rooms is out of range');
        }
    }
}
exports.ApartmentAdDetailsVO = ApartmentAdDetailsVO;
//# sourceMappingURL=apartment-ad-details.value-object.js.map