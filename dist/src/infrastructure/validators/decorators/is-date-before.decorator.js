"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsDateBefore = void 0;
const class_validator_1 = require("class-validator");
function IsDateBefore(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsDateBefore',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    return ((0, class_validator_1.isISO8601)(value, { strict: true }) &&
                        (0, class_validator_1.isISO8601)(relatedValue, { strict: true }) &&
                        Date.parse(value) < Date.parse(relatedValue));
                },
            },
        });
    };
}
exports.IsDateBefore = IsDateBefore;
//# sourceMappingURL=is-date-before.decorator.js.map