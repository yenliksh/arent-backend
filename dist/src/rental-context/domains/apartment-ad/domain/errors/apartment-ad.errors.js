"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdHasEmptyFieldsError = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
class ApartmentAdHasEmptyFieldsError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(ApartmentAdHasEmptyFieldsError.message, metadata);
        this.code = 'APARTMENT_AD.HAS_EMPTY_FIELDS';
    }
}
exports.ApartmentAdHasEmptyFieldsError = ApartmentAdHasEmptyFieldsError;
ApartmentAdHasEmptyFieldsError.message = 'Apartment ad entity has empty fields';
//# sourceMappingURL=apartment-ad.errors.js.map