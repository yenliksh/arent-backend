"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopayCardHasEmptyFieldsError = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
class InnopayCardHasEmptyFieldsError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(InnopayCardHasEmptyFieldsError.message, metadata);
        this.code = 'INNOPAY.HAS_EMPTY_FIELDS';
    }
}
exports.InnopayCardHasEmptyFieldsError = InnopayCardHasEmptyFieldsError;
InnopayCardHasEmptyFieldsError.message = 'Innopay entity has empty fields';
//# sourceMappingURL=innopay-card.errors.js.map