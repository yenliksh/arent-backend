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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyApartmentAdStatusCountResponse = void 0;
const graphql_1 = require("@nestjs/graphql");
const types_1 = require("../../domain/types");
let MyApartmentAdStatusCountResponse = class MyApartmentAdStatusCountResponse {
};
_a = types_1.ApartmentAdStatusType.ACTIVE, _b = types_1.ApartmentAdStatusType.DRAFT, _c = types_1.ApartmentAdStatusType.PAUSED, _d = types_1.ApartmentAdStatusType.PROCESSING, _e = types_1.ApartmentAdStatusType.PUBLISHED;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], MyApartmentAdStatusCountResponse.prototype, _a, void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], MyApartmentAdStatusCountResponse.prototype, _b, void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], MyApartmentAdStatusCountResponse.prototype, _c, void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], MyApartmentAdStatusCountResponse.prototype, _d, void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], MyApartmentAdStatusCountResponse.prototype, _e, void 0);
MyApartmentAdStatusCountResponse = __decorate([
    (0, graphql_1.ObjectType)()
], MyApartmentAdStatusCountResponse);
exports.MyApartmentAdStatusCountResponse = MyApartmentAdStatusCountResponse;
//# sourceMappingURL=my-apartment-ad-status-count.responce.js.map