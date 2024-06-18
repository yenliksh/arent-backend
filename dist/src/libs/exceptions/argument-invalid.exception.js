"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentInvalidException = void 0;
const exception_base_1 = require("./exception.base");
const exception_codes_1 = require("./exception.codes");
class ArgumentInvalidException extends exception_base_1.ExceptionBase {
    constructor() {
        super(...arguments);
        this.code = exception_codes_1.ExceptionCodes.argumentInvalid;
    }
}
exports.ArgumentInvalidException = ArgumentInvalidException;
//# sourceMappingURL=argument-invalid.exception.js.map