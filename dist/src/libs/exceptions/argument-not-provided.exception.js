"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentNotProvidedException = void 0;
const exception_base_1 = require("./exception.base");
const exception_codes_1 = require("./exception.codes");
class ArgumentNotProvidedException extends exception_base_1.ExceptionBase {
    constructor() {
        super(...arguments);
        this.code = exception_codes_1.ExceptionCodes.argumentNotProvided;
    }
}
exports.ArgumentNotProvidedException = ArgumentNotProvidedException;
//# sourceMappingURL=argument-not-provided.exception.js.map