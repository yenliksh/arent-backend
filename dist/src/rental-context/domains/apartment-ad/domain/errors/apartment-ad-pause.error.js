"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdPauseError = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
class ApartmentAdPauseError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(ApartmentAdPauseError.message, metadata);
        this.code = 'APARTMENT_AD.PAUSE_ERROR';
    }
}
exports.ApartmentAdPauseError = ApartmentAdPauseError;
ApartmentAdPauseError.message = 'Apartment ad status cannot be paused';
//# sourceMappingURL=apartment-ad-pause.error.js.map