"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSmsCode = void 0;
const generateSmsCode = (length) => {
    if (isNaN(length)) {
        throw new Error('Length must be a number');
    }
    if (length < 1) {
        throw new Error('Length must be at least 1');
    }
    const possible = '123456789';
    const numberLength = Array.from({ length }, () => 0);
    const smscode = numberLength
        .map(() => {
        return possible.charAt(Math.floor(Math.random() * possible.length));
    })
        .join('');
    return Number(smscode);
};
exports.generateSmsCode = generateSmsCode;
//# sourceMappingURL=generate-sms-code.js.map