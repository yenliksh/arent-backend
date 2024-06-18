"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prependDomainUrlToFileKey = exports.parseFileKeyFromUrl = exports.retrieveFileExtension = void 0;
const slash_agnostic_1 = require("./slash-agnostic");
const retrieveFileExtension = (fileName) => {
    const ext = fileName.split('.').pop();
    if (!ext) {
        return;
    }
    return ext.toLowerCase();
};
exports.retrieveFileExtension = retrieveFileExtension;
const parseFileKeyFromUrl = (url) => {
    const retrieveFileKeyFromUrlRegexp = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)|((\/{1,})?\?.*)$/g;
    return url.replace(retrieveFileKeyFromUrlRegexp, '');
};
exports.parseFileKeyFromUrl = parseFileKeyFromUrl;
const prependDomainUrlToFileKey = (fileKey, type = 'public') => {
    const domainUrlMap = {
        public: process.env.AWS_CF_PUBLIC_FILES,
        private: process.env.AWS_CF_PRIVATE_FILES,
    };
    const domainUrl = domainUrlMap[type];
    const url = fileKey.includes(domainUrl) ? fileKey : (0, slash_agnostic_1.slashAgnostic)(domainUrl, fileKey);
    return url;
};
exports.prependDomainUrlToFileKey = prependDomainUrlToFileKey;
//# sourceMappingURL=file-key.helper.js.map