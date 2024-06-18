"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLanguage = exports.isLanguage = exports.Language = void 0;
const graphql_1 = require("@nestjs/graphql");
var Language;
(function (Language) {
    Language["EN"] = "en";
})(Language = exports.Language || (exports.Language = {}));
(0, graphql_1.registerEnumType)(Language, {
    name: 'Language',
});
const langStrings = Object.values(Language);
function isLanguage(str) {
    return langStrings.includes(str);
}
exports.isLanguage = isLanguage;
function parseLanguage(str) {
    if (!str || !isLanguage(str)) {
        return Language.EN;
    }
    return str;
}
exports.parseLanguage = parseLanguage;
//# sourceMappingURL=localized.base.interface.js.map