"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BucketType = void 0;
const graphql_1 = require("@nestjs/graphql");
var BucketType;
(function (BucketType) {
    BucketType["PUBLIC"] = "public";
    BucketType["PRIVATE"] = "private";
})(BucketType = exports.BucketType || (exports.BucketType = {}));
(0, graphql_1.registerEnumType)(BucketType, {
    name: 'BucketType',
});
//# sourceMappingURL=enums.js.map