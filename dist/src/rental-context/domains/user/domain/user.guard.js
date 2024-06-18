"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGuard = void 0;
const regexps_1 = require("../../../../libs/utils/regexps");
const libphonenumber_js_1 = require("libphonenumber-js");
class UserGuard {
    static isPhoneNumber(value) {
        if (typeof value !== 'string') {
            throw new Error('Value of phone number must be a string');
        }
        const parsed = (0, libphonenumber_js_1.default)(value);
        if (parsed) {
            return true;
        }
        return false;
    }
    static isUrl(value) {
        if (typeof value !== 'string') {
            throw new Error('Value of url must be a string');
        }
        const isValid = regexps_1.urlRegexp.test(value);
        if (isValid) {
            return true;
        }
        return false;
    }
    static isEmail(value) {
        if (typeof value !== 'string') {
            throw new Error('Value of email must be a string');
        }
        const isValid = regexps_1.emailRegexp.test(value);
        if (isValid) {
            return true;
        }
        return false;
    }
}
exports.UserGuard = UserGuard;
//# sourceMappingURL=user.guard.js.map