"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlValidator = void 0;
const regexps_1 = require("../../libs/utils/regexps");
const class_validator_1 = require("class-validator");
let UrlValidator = class UrlValidator {
    validate(value) {
        return typeof value === 'string' ? regexps_1.urlRegexp.test(value) : true;
    }
    defaultMessage(args) {
        return `${args.value} must be url`;
    }
};
UrlValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'UrlValidator', async: false })
], UrlValidator);
exports.UrlValidator = UrlValidator;
//# sourceMappingURL=url.validator.js.map