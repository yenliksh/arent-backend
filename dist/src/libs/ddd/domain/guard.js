"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guard = void 0;
const regexps_1 = require("../../utils/regexps");
class Guard {
    static isEmpty(value) {
        if (typeof value === 'number' || typeof value === 'boolean') {
            return false;
        }
        if (typeof value === 'undefined' || value === null) {
            return true;
        }
        if (value instanceof Date) {
            return false;
        }
        if (value instanceof Object && !Object.keys(value).length) {
            return true;
        }
        if (Array.isArray(value)) {
            if (value.length === 0) {
                return true;
            }
            if (value.every((item) => Guard.isEmpty(item))) {
                return true;
            }
        }
        if (value === '') {
            return true;
        }
        return false;
    }
    static lengthIsBetween(value, min, max) {
        if (Guard.isEmpty(value)) {
            throw new Error('Cannot check length of a value. Provided value is empty');
        }
        const valueLength = typeof value === 'number' ? Number(value).toString().length : value.length;
        if (valueLength >= min && valueLength <= max) {
            return true;
        }
        return false;
    }
    static isValidEnum(value, enumType) {
        if (typeof value !== 'string') {
            throw new Error('Value of apartment type must be a string');
        }
        const isValid = Object.values(enumType).includes(value);
        if (isValid) {
            return true;
        }
        return false;
    }
    static isPositiveNumber(value) {
        if (typeof value !== 'number') {
            throw new Error('Value of cost must be a number');
        }
        const isValid = value > 0;
        if (isValid) {
            return true;
        }
        return false;
    }
    static isNegative(value) {
        if (typeof value !== 'number') {
            throw new Error('Value must be a number');
        }
        const isValid = value < 0;
        if (isValid) {
            return true;
        }
        return false;
    }
    static isFutureDate(value) {
        const date = new Date(value).getTime();
        const now = new Date().getTime();
        return now < date;
    }
    static isDateMoreThan(value, nextValue) {
        const date = new Date(value).getTime();
        const nextDate = new Date(nextValue).getTime();
        return date < nextDate;
    }
    static isFileKey(value) {
        if (typeof value !== 'string') {
            throw new Error('File key must be a string');
        }
        const isValid = regexps_1.fileKeyRegexp.test(value);
        if (isValid) {
            return true;
        }
        return false;
    }
}
exports.Guard = Guard;
//# sourceMappingURL=guard.js.map