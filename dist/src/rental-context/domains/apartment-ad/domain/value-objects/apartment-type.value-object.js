"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentTypeVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const exceptions_1 = require("../../../../../libs/exceptions");
const types_1 = require("../types");
class ApartmentTypeVO extends value_object_base_1.ValueObject {
    static create(type) {
        return new ApartmentTypeVO({ value: type });
    }
    get value() {
        return this.props.value;
    }
    validate({ value }) {
        if (value && !guard_1.Guard.isValidEnum(value, types_1.ApartmentType)) {
            throw new exceptions_1.ArgumentInvalidException('Unexpected apartment type');
        }
    }
}
exports.ApartmentTypeVO = ApartmentTypeVO;
//# sourceMappingURL=apartment-type.value-object.js.map