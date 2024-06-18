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
exports.ModelBase = void 0;
const objection_entity_base_1 = require("../../infrastructure/database/objection.entity.base");
const graphql_1 = require("@nestjs/graphql");
const id_response_dto_1 = require("../dtos/id.response.dto");
let ModelBase = class ModelBase extends id_response_dto_1.IdResponse {
    constructor(entity) {
        var _a;
        super(entity.id);
        this.createdAt = entity.createdAt.toISOString();
        this.updatedAt = entity.updatedAt.toISOString();
        this.deletedAt = (_a = entity.deletedAt) === null || _a === void 0 ? void 0 : _a.toISOString();
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ModelBase.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ModelBase.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ModelBase.prototype, "deletedAt", void 0);
ModelBase = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [objection_entity_base_1.ObjectionEntityBase])
], ModelBase);
exports.ModelBase = ModelBase;
//# sourceMappingURL=model.base.js.map