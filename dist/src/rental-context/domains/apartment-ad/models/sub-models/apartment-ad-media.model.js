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
var ApartmentAdMediaModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdMediaModel = void 0;
const file_key_helper_1 = require("../../../../../libs/utils/file-key.helper");
const graphql_1 = require("@nestjs/graphql");
let ApartmentAdMediaModel = ApartmentAdMediaModel_1 = class ApartmentAdMediaModel {
    constructor(model) {
        Object.assign(this, model);
    }
    static create({ order, fileKey }) {
        return new ApartmentAdMediaModel_1({ order, fileKey: (0, file_key_helper_1.prependDomainUrlToFileKey)(fileKey) });
    }
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], ApartmentAdMediaModel.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ApartmentAdMediaModel.prototype, "fileKey", void 0);
ApartmentAdMediaModel = ApartmentAdMediaModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [ApartmentAdMediaModel])
], ApartmentAdMediaModel);
exports.ApartmentAdMediaModel = ApartmentAdMediaModel;
//# sourceMappingURL=apartment-ad-media.model.js.map