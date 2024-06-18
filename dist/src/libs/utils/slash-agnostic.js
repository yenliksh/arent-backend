"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slashAgnostic = void 0;
const removeSlashAfter = (target) => {
    return target[target.length - 1].includes('/') ? target.slice(0, -1) : target;
};
const addSlashBefore = (target) => {
    return target[0].includes('/') ? target : `/${target}`;
};
const HTTPS = 'https://';
const HTTP = 'http://';
const S3 = 's3://';
const slashAgnostic = (...linkParts) => {
    return linkParts.reduce((link, part, index) => {
        if (index === 0 && !part.includes(HTTPS) && !part.includes(S3) && !part.includes(HTTP)) {
            return HTTPS + part;
        }
        else if (index === 0) {
            return part;
        }
        return `${removeSlashAfter(link)}${addSlashBefore(part)}`;
    }, '');
};
exports.slashAgnostic = slashAgnostic;
//# sourceMappingURL=slash-agnostic.js.map