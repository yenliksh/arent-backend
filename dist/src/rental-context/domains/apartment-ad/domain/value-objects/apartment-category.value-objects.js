"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentCategoryVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const exceptions_1 = require("../../../../../libs/exceptions");
const types_1 = require("../types");
class ApartmentCategoryVO extends value_object_base_1.ValueObject {
    static create(type) {
        return new ApartmentCategoryVO({ value: type });
    }
    get value() {
        return this.props.value;
    }
    validate({ value }) {
        if (value && !guard_1.Guard.isValidEnum(value, types_1.ApartmentCategory)) {
            throw new exceptions_1.ArgumentInvalidException('Unexpected apartment type');
        }
    }
}
exports.ApartmentCategoryVO = ApartmentCategoryVO;
//# sourceMappingURL=apartment-category.value-objects.js.map