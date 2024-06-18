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
var ApartmentAdLockedDatesModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdLockedDatesModel = void 0;
const graphql_1 = require("@nestjs/graphql");
let ApartmentAdLockedDatesModel = ApartmentAdLockedDatesModel_1 = class ApartmentAdLockedDatesModel {
    constructor(model) {
        Object.assign(this, model);
    }
    static create({ startDate, endDate }) {
        return new ApartmentAdLockedDatesModel_1({
            startDate: startDate,
            endDate: endDate,
        });
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ApartmentAdLockedDatesModel.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ApartmentAdLockedDatesModel.prototype, "endDate", void 0);
ApartmentAdLockedDatesModel = ApartmentAdLockedDatesModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [ApartmentAdLockedDatesModel])
], ApartmentAdLockedDatesModel);
exports.ApartmentAdLockedDatesModel = ApartmentAdLockedDatesModel;
//# sourceMappingURL=apartment-ad-locked-dates.model.js.map