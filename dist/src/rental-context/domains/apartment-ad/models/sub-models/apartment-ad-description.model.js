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
var ApartmentAdDescriptionModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdDescriptionModel = void 0;
const graphql_1 = require("@nestjs/graphql");
let ApartmentAdDescriptionModel = ApartmentAdDescriptionModel_1 = class ApartmentAdDescriptionModel {
    constructor(model) {
        Object.assign(this, model);
    }
    static create(props) {
        return new ApartmentAdDescriptionModel_1(props);
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ApartmentAdDescriptionModel.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdDescriptionModel.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdDescriptionModel.prototype, "remoteView", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdDescriptionModel.prototype, "selfCheckIn", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdDescriptionModel.prototype, "freeParking", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdDescriptionModel.prototype, "workSpace", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdDescriptionModel.prototype, "quite", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdDescriptionModel.prototype, "forFamily", void 0);
ApartmentAdDescriptionModel = ApartmentAdDescriptionModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [ApartmentAdDescriptionModel])
], ApartmentAdDescriptionModel);
exports.ApartmentAdDescriptionModel = ApartmentAdDescriptionModel;
//# sourceMappingURL=apartment-ad-description.model.js.map