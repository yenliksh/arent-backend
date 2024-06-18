"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdDescriptionVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const exceptions_1 = require("../../../../../libs/exceptions");
class ApartmentAdDescriptionVO extends value_object_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create({ name, description, remoteView, selfCheckIn, freeParking, workSpace, quite, forFamily, }) {
        return new ApartmentAdDescriptionVO({
            name,
            description,
            remoteView,
            selfCheckIn,
            freeParking,
            workSpace,
            quite,
            forFamily,
        });
    }
    validate(props) {
        const { name, description } = props;
        if (!guard_1.Guard.lengthIsBetween(name, 1, 300)) {
            throw new exceptions_1.ArgumentInvalidException('Name must be in a range between 1 and 300');
        }
        if (description && !guard_1.Guard.lengthIsBetween(description, 1, 2000)) {
            throw new exceptions_1.ArgumentInvalidException('Description must be in a range between 1 and 2000');
        }
    }
}
exports.ApartmentAdDescriptionVO = ApartmentAdDescriptionVO;
//# sourceMappingURL=apartment-ad-description.value-object.js.map