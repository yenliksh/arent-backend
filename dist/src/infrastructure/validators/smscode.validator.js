"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmscodeValidator = void 0;
const class_validator_1 = require("class-validator");
let SmscodeValidator = class SmscodeValidator {
    validate(value) {
        var _a;
        this._length = Number((_a = process.env.SMS_CODE_LENGTH) !== null && _a !== void 0 ? _a : 4);
        return value.length === this._length;
    }
    defaultMessage() {
        return `Smscode length must be ${this._length}`;
    }
};
SmscodeValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'SmscodeValidator', async: false })
], SmscodeValidator);
exports.SmscodeValidator = SmscodeValidator;
//# sourceMappingURL=smscode.validator.js.map