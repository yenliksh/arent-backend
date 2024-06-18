"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxNumberString = void 0;
const class_validator_1 = require("class-validator");
function MaxNumberString(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'maxNumberString',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions || { message: `max must not be greater than ${property}` },
            validator: {
                validate(value, args) {
                    const [max] = args.constraints;
                    if (max != null && property != null && typeof value === 'string' && typeof max === 'number') {
                        return Number(value) <= max;
                    }
                    return false;
                },
            },
        });
    };
}
exports.MaxNumberString = MaxNumberString;
//# sourceMappingURL=max-number-string.decorator.js.map