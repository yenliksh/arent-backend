"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsFutureDateTime = void 0;
const class_validator_1 = require("class-validator");
function IsFutureDateTime(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsFutureDateTime',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(inputDate) {
                    return (0, class_validator_1.isISO8601)(inputDate, { strict: true }) && Date.parse(inputDate) > Date.now();
                },
            },
        });
    };
}
exports.IsFutureDateTime = IsFutureDateTime;
//# sourceMappingURL=is-future-date-time.decorator.js.map