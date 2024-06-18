"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentOutOfRangeException = void 0;
const exception_base_1 = require("./exception.base");
const exception_codes_1 = require("./exception.codes");
class ArgumentOutOfRangeException extends exception_base_1.ExceptionBase {
    constructor() {
        super(...arguments);
        this.code = exception_codes_1.ExceptionCodes.argumentOutOfRange;
    }
}
exports.ArgumentOutOfRangeException = ArgumentOutOfRangeException;
//# sourceMappingURL=argument-out-of-range.exception.js.map