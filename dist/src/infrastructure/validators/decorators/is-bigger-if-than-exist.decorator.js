"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBiggerIfThanExist = void 0;
const class_validator_1 = require("class-validator");
function IsBiggerIfThanExist(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isBiggerThan',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    if (relatedValue != null && typeof value === 'number' && typeof relatedValue === 'number') {
                        return value > relatedValue;
                    }
                    if (relatedValue != null && typeof value === 'string' && typeof relatedValue === 'string') {
                        return Number(value) > Number(relatedValue);
                    }
                    return true;
                },
            },
        });
    };
}
exports.IsBiggerIfThanExist = IsBiggerIfThanExist;
//# sourceMappingURL=is-bigger-if-than-exist.decorator.js.map