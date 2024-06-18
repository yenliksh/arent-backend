"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdCharacteristicsVO = void 0;
const value_object_base_1 = require("../../libs/ddd/domain/base-classes/value-object.base");
class ApartmentAdCharacteristicsVO extends value_object_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(props) {
        return new ApartmentAdCharacteristicsVO(props);
    }
    validate() {
        true;
    }
}
exports.ApartmentAdCharacteristicsVO = ApartmentAdCharacteristicsVO;
//# sourceMappingURL=apartment-characteristics.value-object.js.map