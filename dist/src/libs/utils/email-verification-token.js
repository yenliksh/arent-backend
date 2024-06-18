"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeVerificationToken = exports.generateVerificationToken = void 0;
const generateVerificationToken = (email) => {
    return Buffer.from(JSON.stringify(email)).toString('base64');
};
exports.generateVerificationToken = generateVerificationToken;
const decodeVerificationToken = (token) => {
    return JSON.parse(Buffer.from(token, 'base64').toString());
};
exports.decodeVerificationToken = decodeVerificationToken;
//# sourceMappingURL=email-verification-token.js.map