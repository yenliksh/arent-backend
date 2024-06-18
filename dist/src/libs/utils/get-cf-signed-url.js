"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCfSignedUrl = void 0;
const path = require("path");
const cfSign = require("aws-cloudfront-sign");
const getCfSignedUrl = (url) => {
    const options = {
        expireTime: new Date().getTime() + 60 * 60 * 1000,
        keypairId: process.env.AWS_KEYPAIR_ID,
        privateKeyPath: path.join(__dirname, '../../../../private_key.pem'),
    };
    const signedUrl = cfSign.getSignedUrl(url, options);
    return signedUrl;
};
exports.getCfSignedUrl = getCfSignedUrl;
//# sourceMappingURL=get-cf-signed-url.js.map