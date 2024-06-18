"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertPropsToObject = void 0;
const value_object_base_1 = require("../base-classes/value-object.base");
function convertToPlainObject(item) {
    if (value_object_base_1.ValueObject.isValueObject(item)) {
        return item.unpack();
    }
    return item;
}
function convertPropsToObject(props) {
    const propsCopy = { ...props };
    for (const prop in propsCopy) {
        if (Array.isArray(propsCopy[prop])) {
            propsCopy[prop] = propsCopy[prop].map((item) => {
                return convertToPlainObject(item);
            });
        }
        propsCopy[prop] = convertToPlainObject(propsCopy[prop]);
    }
    return propsCopy;
}
exports.convertPropsToObject = convertPropsToObject;
//# sourceMappingURL=convert-props-to-object.util.js.map