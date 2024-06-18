"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IllegalOperationException = void 0;
const exception_base_1 = require("./exception.base");
const exception_codes_1 = require("./exception.codes");
class IllegalOperationException extends exception_base_1.ExceptionBase {
    constructor() {
        super(...arguments);
        this.code = exception_codes_1.ExceptionCodes.illegalOperation;
    }
}
exports.IllegalOperationException = IllegalOperationException;
//# sourceMappingURL=illegal-operation.exception.js.map