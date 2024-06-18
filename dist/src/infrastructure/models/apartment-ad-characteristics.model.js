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
var ApartmentAdCharacteristicsModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdCharacteristicsModel = void 0;
const graphql_1 = require("@nestjs/graphql");
let ApartmentAdCharacteristicsModel = ApartmentAdCharacteristicsModel_1 = class ApartmentAdCharacteristicsModel {
    constructor(model) {
        Object.assign(this, model);
    }
    static create(props) {
        return new ApartmentAdCharacteristicsModel_1(props);
    }
};
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdCharacteristicsModel.prototype, "totalArea", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdCharacteristicsModel.prototype, "landArea", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdCharacteristicsModel.prototype, "territoryArea", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdCharacteristicsModel.prototype, "objectArea", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdCharacteristicsModel.prototype, "ceilingHeight", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdCharacteristicsModel.prototype, "yearOfConstruction", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdCharacteristicsModel.prototype, "floor", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdCharacteristicsModel.prototype, "waterSupply", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdCharacteristicsModel.prototype, "gasSupply", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdCharacteristicsModel.prototype, "electricitySupply", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdCharacteristicsModel.prototype, "objectPlacement", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdCharacteristicsModel.prototype, "light", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdCharacteristicsModel.prototype, "water", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdCharacteristicsModel.prototype, "gas", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdCharacteristicsModel.prototype, "sewerage", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdCharacteristicsModel.prototype, "heating", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Object)
], ApartmentAdCharacteristicsModel.prototype, "ventilation", void 0);
ApartmentAdCharacteristicsModel = ApartmentAdCharacteristicsModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [ApartmentAdCharacteristicsModel])
], ApartmentAdCharacteristicsModel);
exports.ApartmentAdCharacteristicsModel = ApartmentAdCharacteristicsModel;
//# sourceMappingURL=apartment-ad-characteristics.model.js.map