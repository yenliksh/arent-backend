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
exports.BaseOffsetPaginationRequest = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let BaseOffsetPaginationRequest = class BaseOffsetPaginationRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { limit: { required: true, type: () => Number, minimum: 1 }, page: { required: true, type: () => Number, minimum: 1 } };
    }
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsPositive)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], BaseOffsetPaginationRequest.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsPositive)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], BaseOffsetPaginationRequest.prototype, "page", void 0);
BaseOffsetPaginationRequest = __decorate([
    (0, graphql_1.InputType)()
], BaseOffsetPaginationRequest);
exports.BaseOffsetPaginationRequest = BaseOffsetPaginationRequest;
//# sourceMappingURL=base-offset-pagination.request.dto.js.map