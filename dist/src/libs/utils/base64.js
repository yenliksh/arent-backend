"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeBase64 = exports.encodeBase64 = void 0;
function encodeBase64(payload) {
    return Buffer.from(JSON.stringify(payload)).toString('base64');
}
exports.encodeBase64 = encodeBase64;
function decodeBase64(payload) {
    return JSON.parse(Buffer.from(payload, 'base64').toString());
}
exports.decodeBase64 = decodeBase64;
//# sourceMappingURL=base64.js.map