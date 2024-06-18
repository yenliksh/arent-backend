"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdGuard = exports.MILITARY_TIMES = void 0;
const class_validator_1 = require("class-validator");
const types_1 = require("./types");
exports.MILITARY_TIMES = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
];
class ApartmentAdGuard {
    static isProperlyTermPeriod(values) {
        const validRentPeriodTypeMap = {
            [types_1.RentPeriodType.SHORT_TERM]: ({ shortTermRent, longTermRent }) => {
                if ((shortTermRent === null || shortTermRent === void 0 ? void 0 : shortTermRent.id) && !(longTermRent === null || longTermRent === void 0 ? void 0 : longTermRent.id)) {
                    return true;
                }
                return false;
            },
            [types_1.RentPeriodType.LONG_TERM]: ({ longTermRent, shortTermRent }) => {
                if ((longTermRent === null || longTermRent === void 0 ? void 0 : longTermRent.id) && !(shortTermRent === null || shortTermRent === void 0 ? void 0 : shortTermRent.id)) {
                    return true;
                }
                return false;
            },
            [types_1.RentPeriodType.ALL]: ({ shortTermRent, longTermRent }) => {
                if ((shortTermRent === null || shortTermRent === void 0 ? void 0 : shortTermRent.id) && (longTermRent === null || longTermRent === void 0 ? void 0 : longTermRent.id)) {
                    return true;
                }
                return false;
            },
        };
        const { rentPeriodType, longTermRent, shortTermRent } = values;
        return validRentPeriodTypeMap[rentPeriodType.value]({ longTermRent, shortTermRent });
    }
    static isNumberOfRooms(value) {
        if (typeof value !== 'number') {
            throw new Error('Value of cost must be a number');
        }
        const isValid = value >= 0 && value <= 8;
        if (isValid) {
            return true;
        }
        return false;
    }
    static isLat(value) {
        if (typeof value !== 'number') {
            throw new Error('Latitude must be a number');
        }
        const isValid = (0, class_validator_1.isLatitude)(value.toString());
        if (isValid) {
            return true;
        }
        return false;
    }
    static isLng(value) {
        if (typeof value !== 'number') {
            throw new Error('Longitude must be a number');
        }
        const isValid = (0, class_validator_1.isLongitude)(value.toString());
        if (isValid) {
            return true;
        }
        return false;
    }
    static isArrivalOrDepartureTime(value) {
        if (typeof value !== 'string') {
            throw new Error('Longitude must be a string');
        }
        if (exports.MILITARY_TIMES.some((i) => i === value)) {
            return true;
        }
        return false;
    }
}
exports.ApartmentAdGuard = ApartmentAdGuard;
//# sourceMappingURL=apartment-ad.guard.js.map