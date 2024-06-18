"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdConstrainError = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
class ApartmentAdConstrainError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(ApartmentAdConstrainError.message, metadata);
        this.code = 'APARTMENT_AD.CONSTRAINT_ERROR';
    }
}
exports.ApartmentAdConstrainError = ApartmentAdConstrainError;
ApartmentAdConstrainError.message = 'Invalid applying changes';
//# sourceMappingURL=apartment-ad-constrain.errors.js.map