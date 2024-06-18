"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongTermRentError = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
class LongTermRentError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(LongTermRentError.message, metadata);
        this.code = 'APARTMENT_AD.UNEXPECTED_ACTION';
    }
}
exports.LongTermRentError = LongTermRentError;
LongTermRentError.message = 'Apartment ad must be a long term rent type for applying changes';
//# sourceMappingURL=long-term-rent.errors.js.map