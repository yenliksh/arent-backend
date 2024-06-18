"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageBeforeCursorInfo = exports.PageAfterCursorInfo = void 0;
const graphql_1 = require("@nestjs/graphql");
let PageAfterCursorInfo = class PageAfterCursorInfo {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PageAfterCursorInfo.prototype, "perPage", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PageAfterCursorInfo.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], PageAfterCursorInfo.prototype, "afterCursor", void 0);
PageAfterCursorInfo = __decorate([
    (0, graphql_1.ObjectType)()
], PageAfterCursorInfo);
exports.PageAfterCursorInfo = PageAfterCursorInfo;
let PageBeforeCursorInfo = class PageBeforeCursorInfo {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PageBeforeCursorInfo.prototype, "perPage", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PageBeforeCursorInfo.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], PageBeforeCursorInfo.prototype, "beforeCursor", void 0);
PageBeforeCursorInfo = __decorate([
    (0, graphql_1.ObjectType)()
], PageBeforeCursorInfo);
exports.PageBeforeCursorInfo = PageBeforeCursorInfo;
//# sourceMappingURL=page-cursor-info.model.js.map