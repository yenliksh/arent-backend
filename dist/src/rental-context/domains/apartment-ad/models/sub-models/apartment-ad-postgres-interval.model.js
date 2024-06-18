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
var ApartmentAdTimeIntervalModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdTimeIntervalModel = void 0;
const graphql_1 = require("@nestjs/graphql");
let ApartmentAdTimeIntervalModel = ApartmentAdTimeIntervalModel_1 = class ApartmentAdTimeIntervalModel {
    constructor(model) {
        Object.assign(this, model);
    }
    static create(data) {
        return new ApartmentAdTimeIntervalModel_1({
            days: data === null || data === void 0 ? void 0 : data.days,
            hours: data === null || data === void 0 ? void 0 : data.hours,
            minutes: data === null || data === void 0 ? void 0 : data.minutes,
            seconds: data === null || data === void 0 ? void 0 : data.seconds,
            milliseconds: data === null || data === void 0 ? void 0 : data.milliseconds,
        });
    }
};
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], ApartmentAdTimeIntervalModel.prototype, "days", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], ApartmentAdTimeIntervalModel.prototype, "hours", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], ApartmentAdTimeIntervalModel.prototype, "minutes", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], ApartmentAdTimeIntervalModel.prototype, "seconds", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], ApartmentAdTimeIntervalModel.prototype, "milliseconds", void 0);
ApartmentAdTimeIntervalModel = ApartmentAdTimeIntervalModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [ApartmentAdTimeIntervalModel])
], ApartmentAdTimeIntervalModel);
exports.ApartmentAdTimeIntervalModel = ApartmentAdTimeIntervalModel;
//# sourceMappingURL=apartment-ad-postgres-interval.model.js.map