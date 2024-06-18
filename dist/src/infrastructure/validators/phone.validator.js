"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneValidator = void 0;
const class_validator_1 = require("class-validator");
const libphonenumber_js_1 = require("libphonenumber-js");
let PhoneValidator = class PhoneValidator {
    validate(value) {
        var _a, _b;
        const parsed = (0, libphonenumber_js_1.findPhoneNumbersInText)(value, 'KZ');
        if (((_b = (_a = parsed[0]) === null || _a === void 0 ? void 0 : _a.number) === null || _b === void 0 ? void 0 : _b.country) === 'RU') {
            return false;
        }
        return !!parsed[0];
    }
    defaultMessage(args) {
        return `${args.value} must be valid phone number`;
    }
};
PhoneValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'PhoneValidator', async: false })
], PhoneValidator);
exports.PhoneValidator = PhoneValidator;
//# sourceMappingURL=phone.validator.js.map