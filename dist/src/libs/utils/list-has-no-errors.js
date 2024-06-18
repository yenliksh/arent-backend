"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listHasNoErrors = void 0;
function listHasNoErrors(list) {
    return !list.some((item) => item instanceof Error);
}
exports.listHasNoErrors = listHasNoErrors;
//# sourceMappingURL=list-has-no-errors.js.map