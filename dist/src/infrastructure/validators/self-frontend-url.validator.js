"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfFrontendUrlValidator = void 0;
const class_validator_1 = require("class-validator");
const url_validator_1 = require("./url.validator");
let SelfFrontendUrlValidator = class SelfFrontendUrlValidator extends url_validator_1.UrlValidator {
    validate(value) {
        var _a, _b;
        if (!value) {
            return true;
        }
        const urls = (_b = (_a = process.env.CORS_CLIENT_URLS) === null || _a === void 0 ? void 0 : _a.split(',')) !== null && _b !== void 0 ? _b : [];
        return super.validate(value) && urls.some((url) => value.trim().startsWith(url));
    }
    defaultMessage(args) {
        return `${args.value} must be self frontend url`;
    }
};
SelfFrontendUrlValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'SelfFrontendUrlValidator', async: false })
], SelfFrontendUrlValidator);
exports.SelfFrontendUrlValidator = SelfFrontendUrlValidator;
//# sourceMappingURL=self-frontend-url.validator.js.map