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
exports.IdResponse = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
let IdResponse = class IdResponse {
    constructor(id) {
        this.id = id;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'ex. 2cdc8ab1-6d50-49cc-ba14-54e4ac7ec231' }),
    __metadata("design:type", String)
], IdResponse.prototype, "id", void 0);
IdResponse = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [String])
], IdResponse);
exports.IdResponse = IdResponse;
//# sourceMappingURL=id.response.dto.js.map