"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentRulesVO = void 0;
const value_object_base_1 = require("../../libs/ddd/domain/base-classes/value-object.base");
const apartment_ad_errors_1 = require("../domains/apartment-ad/domain/errors/apartment-ad.errors");
class ApartmentRulesVO extends value_object_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(props) {
        return new ApartmentRulesVO(props);
    }
    validate(props) {
        const { allowedToHangingOut, allowedToSmoke, allowedWithChildren, allowedWithPets } = props;
        const fields = [allowedToHangingOut, allowedToSmoke, allowedWithChildren, allowedWithPets];
        if (fields.some((f) => f == null)) {
            throw new apartment_ad_errors_1.ApartmentAdHasEmptyFieldsError('Apartment ad important info must have all required fields');
        }
    }
}
exports.ApartmentRulesVO = ApartmentRulesVO;
//# sourceMappingURL=apartment-rules.value-object.js.map