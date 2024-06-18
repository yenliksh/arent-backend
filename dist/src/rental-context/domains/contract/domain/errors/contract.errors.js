"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractHasEmptyFieldsError = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
class ContractHasEmptyFieldsError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(`${ContractHasEmptyFieldsError.message}: ${metadata}`, metadata);
        this.code = 'CONTRACT.HAS_EMPTY_FIELDS';
    }
}
exports.ContractHasEmptyFieldsError = ContractHasEmptyFieldsError;
ContractHasEmptyFieldsError.message = 'Contract entity has empty fields';
//# sourceMappingURL=contract.errors.js.map