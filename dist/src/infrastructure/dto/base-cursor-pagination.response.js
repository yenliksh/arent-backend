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
exports.BaseBeforeCursorPaginationResponse = exports.BaseAfterCursorPaginationResponse = void 0;
const page_cursor_info_model_1 = require("../models/page-cursor-info.model");
const graphql_1 = require("@nestjs/graphql");
function BaseAfterCursorPaginationResponse(M) {
    let BaseCursorPaginationResponse = class BaseCursorPaginationResponse {
    };
    __decorate([
        (0, graphql_1.Field)(() => [M], { nullable: true }),
        __metadata("design:type", Array)
    ], BaseCursorPaginationResponse.prototype, "data", void 0);
    __decorate([
        (0, graphql_1.Field)(() => page_cursor_info_model_1.PageAfterCursorInfo, { nullable: true }),
        __metadata("design:type", page_cursor_info_model_1.PageAfterCursorInfo)
    ], BaseCursorPaginationResponse.prototype, "pageInfo", void 0);
    BaseCursorPaginationResponse = __decorate([
        (0, graphql_1.ObjectType)({ isAbstract: true })
    ], BaseCursorPaginationResponse);
    return BaseCursorPaginationResponse;
}
exports.BaseAfterCursorPaginationResponse = BaseAfterCursorPaginationResponse;
function BaseBeforeCursorPaginationResponse(M) {
    let BaseCursorPaginationResponse = class BaseCursorPaginationResponse {
    };
    __decorate([
        (0, graphql_1.Field)(() => [M], { nullable: true }),
        __metadata("design:type", Array)
    ], BaseCursorPaginationResponse.prototype, "data", void 0);
    __decorate([
        (0, graphql_1.Field)(() => page_cursor_info_model_1.PageBeforeCursorInfo, { nullable: true }),
        __metadata("design:type", page_cursor_info_model_1.PageBeforeCursorInfo)
    ], BaseCursorPaginationResponse.prototype, "pageInfo", void 0);
    BaseCursorPaginationResponse = __decorate([
        (0, graphql_1.ObjectType)({ isAbstract: true })
    ], BaseCursorPaginationResponse);
    return BaseCursorPaginationResponse;
}
exports.BaseBeforeCursorPaginationResponse = BaseBeforeCursorPaginationResponse;
//# sourceMappingURL=base-cursor-pagination.response.js.map