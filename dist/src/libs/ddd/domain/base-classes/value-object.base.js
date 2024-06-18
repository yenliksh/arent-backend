"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
const argument_not_provided_exception_1 = require("../../../exceptions/argument-not-provided.exception");
const guard_1 = require("../guard");
const convert_props_to_object_util_1 = require("../utils/convert-props-to-object.util");
class ValueObject {
    constructor(props) {
        this.checkIfEmpty(props);
        this.validate(props);
        this.props = props;
    }
    static isValueObject(obj) {
        return obj instanceof ValueObject;
    }
    equals(vo) {
        if (vo === null || vo === undefined) {
            return false;
        }
        return JSON.stringify(this) === JSON.stringify(vo);
    }
    unpack() {
        if (this.isDomainPrimitive(this.props)) {
            return this.props.value;
        }
        const propsCopy = (0, convert_props_to_object_util_1.convertPropsToObject)(this.props);
        return Object.freeze(propsCopy);
    }
    checkIfEmpty(props) {
        if (guard_1.Guard.isEmpty(props) || (this.isDomainPrimitive(props) && guard_1.Guard.isEmpty(props.value))) {
            throw new argument_not_provided_exception_1.ArgumentNotProvidedException('Property cannot be empty');
        }
    }
    isDomainPrimitive(obj) {
        if (Object.prototype.hasOwnProperty.call(obj, 'value')) {
            return true;
        }
        return false;
    }
}
exports.ValueObject = ValueObject;
//# sourceMappingURL=value-object.base.js.map