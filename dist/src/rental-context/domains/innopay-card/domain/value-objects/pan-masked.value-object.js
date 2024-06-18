"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanMaskedVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const exceptions_1 = require("../../../../../libs/exceptions");
class PanMaskedVO extends value_object_base_1.ValueObject {
    constructor(value) {
        super({ value });
        this.props.value = PanMaskedVO.format(value);
    }
    get value() {
        return this.props.value;
    }
    validate({ value }) {
        if (value == null) {
            throw new exceptions_1.ArgumentInvalidException('Pan masked required');
        }
    }
    static format(panMasked) {
        return panMasked.length === 4 ? panMasked : panMasked.split(/\*+/)[1];
    }
}
exports.PanMaskedVO = PanMaskedVO;
//# sourceMappingURL=pan-masked.value-object.js.map