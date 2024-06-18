"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractRequestHasNullRequiredFieldsError = exports.ContractRequestHasEmptyFieldsError = void 0;
const exceptions_1 = require("../../../../../libs/exceptions");
class ContractRequestHasEmptyFieldsError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(ContractRequestHasEmptyFieldsError.message, metadata);
        this.code = 'CONTRACT_REQUEST.HAS_EMPTY_FIELDS';
    }
}
exports.ContractRequestHasEmptyFieldsError = ContractRequestHasEmptyFieldsError;
ContractRequestHasEmptyFieldsError.message = 'Contract request entity has empty fields';
class ContractRequestHasNullRequiredFieldsError extends exceptions_1.ExceptionBase {
    constructor(metadata) {
        super(ContractRequestHasNullRequiredFieldsError.message, metadata);
        this.code = 'CONTRACT_REQUEST.HAS_NULL_REQUIRED_FIELDS';
    }
}
exports.ContractRequestHasNullRequiredFieldsError = ContractRequestHasNullRequiredFieldsError;
ContractRequestHasNullRequiredFieldsError.message = 'Contract request has null required fields';
//# sourceMappingURL=contract-request.errors.js.map