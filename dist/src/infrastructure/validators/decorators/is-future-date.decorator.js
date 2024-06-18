"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsFutureDate = void 0;
const class_validator_1 = require("class-validator");
function IsFutureDate(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsFutureDate',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(inputDate) {
                    if (inputDate == null) {
                        return true;
                    }
                    const currentDate = Date.parse(new Date().toISOString().slice(0, 10));
                    return (0, class_validator_1.isISO8601)(inputDate, { strict: true }) && Date.parse(inputDate) >= currentDate;
                },
                defaultMessage(args) {
                    return `${args.value} must be future date`;
                },
            },
        });
    };
}
exports.IsFutureDate = IsFutureDate;
//# sourceMappingURL=is-future-date.decorator.js.map