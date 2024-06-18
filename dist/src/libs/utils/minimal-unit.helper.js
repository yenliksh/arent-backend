"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSmallestUnitString = exports.toMinorUnitString = exports.toSmallestUnit = exports.toMinorUnit = exports.toMinorUnitTransformer = exports.toSmallestUnitTransformer = void 0;
const constants_1 = require("../../rental-context/constants");
const toSmallestUnitTransformer = (params) => {
    if (!params.value) {
        return params.value;
    }
    if (typeof params.value === 'number') {
        return (0, exports.toSmallestUnit)(Number(params.value));
    }
    return params.value;
};
exports.toSmallestUnitTransformer = toSmallestUnitTransformer;
const toMinorUnitTransformer = (params) => {
    if (!params.value) {
        return params.value;
    }
    if (typeof params.value === 'number') {
        return (0, exports.toMinorUnit)(Number(params.value));
    }
    return params.value;
};
exports.toMinorUnitTransformer = toMinorUnitTransformer;
const toMinorUnit = (value) => {
    return Math.ceil(value / constants_1.MINIMAL_UNIT_FACTOR);
};
exports.toMinorUnit = toMinorUnit;
const toSmallestUnit = (value) => {
    return value * constants_1.MINIMAL_UNIT_FACTOR;
};
exports.toSmallestUnit = toSmallestUnit;
const toMinorUnitString = (value) => {
    return (0, exports.toMinorUnit)(value).toString();
};
exports.toMinorUnitString = toMinorUnitString;
const toSmallestUnitString = (value) => {
    return (0, exports.toSmallestUnit)(value).toString();
};
exports.toSmallestUnitString = toSmallestUnitString;
//# sourceMappingURL=minimal-unit.helper.js.map