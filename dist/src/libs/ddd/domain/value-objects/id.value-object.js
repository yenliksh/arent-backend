"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ID = void 0;
const value_object_base_1 = require("../base-classes/value-object.base");
class ID extends value_object_base_1.ValueObject {
    constructor(value) {
        super({ value });
    }
    get value() {
        return this.props.value;
    }
}
exports.ID = ID;
//# sourceMappingURL=id.value-object.js.map