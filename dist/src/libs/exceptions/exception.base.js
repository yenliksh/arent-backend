"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionBase = void 0;
class ExceptionBase extends Error {
    constructor(message, metadata) {
        super(message);
        this.message = message;
        this.metadata = metadata;
        Error.captureStackTrace(this, this.constructor);
    }
    toJSON() {
        return {
            message: this.message,
            code: this.code,
            stack: this.stack,
            metadata: this.metadata,
        };
    }
}
exports.ExceptionBase = ExceptionBase;
//# sourceMappingURL=exception.base.js.map