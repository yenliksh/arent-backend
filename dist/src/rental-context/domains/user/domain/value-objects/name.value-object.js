"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const exceptions_1 = require("../../../../../libs/exceptions");
class NameVO extends value_object_base_1.ValueObject {
    constructor(value) {
        super({ value });
        this.props.value = NameVO.format(value);
    }
    get value() {
        return this.props.value;
    }
    validate({ value }) {
        if (!guard_1.Guard.lengthIsBetween(value, 1, 200)) {
            throw new exceptions_1.ArgumentOutOfRangeException('Name must be a range from 1 to 200');
        }
    }
    static format(name) {
        const trimmedName = name.trim();
        return trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1);
    }
}
exports.NameVO = NameVO;
//# sourceMappingURL=name.value-object.js.map