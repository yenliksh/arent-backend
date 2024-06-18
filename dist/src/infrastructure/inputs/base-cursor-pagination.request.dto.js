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
exports.BaseBeforeCursorPaginateRequest = exports.BaseAfterCursorPaginateRequest = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const cursor_validator_1 = require("../validators/cursor.validator");
let BaseAfterCursorPaginateRequest = class BaseAfterCursorPaginateRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { afterCursor: { required: false, type: () => String }, limit: { required: false, type: () => Number, minimum: 1, maximum: 20 } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, cursor_validator_1.IsValidRequestCursor)(),
    __metadata("design:type", String)
], BaseAfterCursorPaginateRequest.prototype, "afterCursor", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true, defaultValue: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(20),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], BaseAfterCursorPaginateRequest.prototype, "limit", void 0);
BaseAfterCursorPaginateRequest = __decorate([
    (0, graphql_1.InputType)()
], BaseAfterCursorPaginateRequest);
exports.BaseAfterCursorPaginateRequest = BaseAfterCursorPaginateRequest;
let BaseBeforeCursorPaginateRequest = class BaseBeforeCursorPaginateRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { beforeCursor: { required: false, type: () => String }, limit: { required: false, type: () => Number, minimum: 1, maximum: 20 } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, cursor_validator_1.IsValidRequestCursor)(),
    __metadata("design:type", String)
], BaseBeforeCursorPaginateRequest.prototype, "beforeCursor", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true, defaultValue: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(20),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], BaseBeforeCursorPaginateRequest.prototype, "limit", void 0);
BaseBeforeCursorPaginateRequest = __decorate([
    (0, graphql_1.InputType)()
], BaseBeforeCursorPaginateRequest);
exports.BaseBeforeCursorPaginateRequest = BaseBeforeCursorPaginateRequest;
//# sourceMappingURL=base-cursor-pagination.request.dto.js.map