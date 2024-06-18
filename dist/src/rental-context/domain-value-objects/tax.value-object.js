"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxVO = void 0;
const value_object_base_1 = require("../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../libs/ddd/domain/guard");
const exceptions_1 = require("../../libs/exceptions");
class TaxVO extends value_object_base_1.ValueObject {
    get value() {
        return this.props.value;
    }
    validate(props) {
        if (guard_1.Guard.isNegative(props.value)) {
            throw new exceptions_1.ArgumentInvalidException('Tax must be positive number');
        }
        if (props.value > 1) {
            throw new exceptions_1.ArgumentInvalidException('Tax rate cannot be more than 1');
        }
    }
}
exports.TaxVO = TaxVO;
//# sourceMappingURL=tax.value-object.js.map