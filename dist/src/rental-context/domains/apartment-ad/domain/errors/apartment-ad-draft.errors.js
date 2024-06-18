"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdDraftError = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
class ApartmentAdDraftError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(ApartmentAdDraftError.message, metadata);
        this.code = 'APARTMENT_AD.CAN_NOT_BE_CHANGED';
    }
}
exports.ApartmentAdDraftError = ApartmentAdDraftError;
ApartmentAdDraftError.message = 'Apartment ad should be changes by another method';
//# sourceMappingURL=apartment-ad-draft.errors.js.map