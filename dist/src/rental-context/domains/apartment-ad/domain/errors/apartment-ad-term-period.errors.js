"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdTermPeriodError = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
class ApartmentAdTermPeriodError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(ApartmentAdTermPeriodError.message, metadata);
        this.code = 'APARTMENT_AD.HAS_WRONG_TERM_PERIOD_FIELDS';
    }
}
exports.ApartmentAdTermPeriodError = ApartmentAdTermPeriodError;
ApartmentAdTermPeriodError.message = 'Apartment ad has wrong term period fields';
//# sourceMappingURL=apartment-ad-term-period.errors.js.map