"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinNumberString = void 0;
const class_validator_1 = require("class-validator");
function MinNumberString(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'minNumberString',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions || { message: `min must not be less than ${property}` },
            validator: {
                validate(value, args) {
                    const [min] = args.constraints;
                    if (min != null && property != null && typeof value === 'string' && typeof min === 'number') {
                        return Number(value) >= min;
                    }
                    return false;
                },
            },
        });
    };
}
exports.MinNumberString = MinNumberString;
//# sourceMappingURL=min-number-string.decorator.js.map