"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateISOValidator = void 0;
const class_validator_1 = require("class-validator");
let DateISOValidator = class DateISOValidator {
    validate(value) {
        if (value == null) {
            return true;
        }
        return value != null && value.length === 10 && (0, class_validator_1.isISO8601)(value, { strict: true });
    }
    defaultMessage(args) {
        return `${args.value} must be date ex. YYYY-MM-DD`;
    }
};
DateISOValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'DateISOValidator', async: false })
], DateISOValidator);
exports.DateISOValidator = DateISOValidator;
//# sourceMappingURL=iso-date.validator.js.map