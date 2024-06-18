"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentGuestsVO = void 0;
const value_object_base_1 = require("../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../libs/ddd/domain/guard");
const exceptions_1 = require("../../libs/exceptions");
class ApartmentGuestsVO extends value_object_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(props) {
        const transformedProps = ApartmentGuestsVO.transform(props);
        return new ApartmentGuestsVO(transformedProps);
    }
    validate(props) {
        const { numberOfAdult, numberOfChildren, numberOfPets } = props;
        if (guard_1.Guard.isNegative(numberOfAdult) || guard_1.Guard.isNegative(numberOfChildren) || guard_1.Guard.isNegative(numberOfPets)) {
            throw new exceptions_1.ArgumentInvalidException('Number must be more than 0');
        }
    }
    static transform(props) {
        const { numberOfAdult, numberOfChildren, numberOfPets } = props;
        return {
            numberOfAdult: numberOfAdult !== null && numberOfAdult !== void 0 ? numberOfAdult : 0,
            numberOfChildren: numberOfChildren !== null && numberOfChildren !== void 0 ? numberOfChildren : 0,
            numberOfPets: numberOfPets !== null && numberOfPets !== void 0 ? numberOfPets : 0,
        };
    }
}
exports.ApartmentGuestsVO = ApartmentGuestsVO;
//# sourceMappingURL=apartment-guests.value-object.js.map