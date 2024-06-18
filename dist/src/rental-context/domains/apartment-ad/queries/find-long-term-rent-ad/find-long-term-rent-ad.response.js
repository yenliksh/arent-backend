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
var FindLongTermRentAdResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindLongTermRentAdResponse = void 0;
const apartment_ad_long_term_rent_model_1 = require("../../models/apartment-ad-long-term-rent.model");
const apartment_ad_postgres_interval_model_1 = require("../../models/sub-models/apartment-ad-postgres-interval.model");
const graphql_1 = require("@nestjs/graphql");
let FindLongTermRentAdResponse = FindLongTermRentAdResponse_1 = class FindLongTermRentAdResponse {
};
FindLongTermRentAdResponse.create = (data, averageResponseOnRequest) => {
    const payload = new FindLongTermRentAdResponse_1();
    payload.data = apartment_ad_long_term_rent_model_1.ApartmentAdLongTermRentViewModel.create(data);
    payload.averageResponseOnRequest = apartment_ad_postgres_interval_model_1.ApartmentAdTimeIntervalModel.create(averageResponseOnRequest);
    return payload;
};
__decorate([
    (0, graphql_1.Field)(() => apartment_ad_long_term_rent_model_1.ApartmentAdLongTermRentViewModel),
    __metadata("design:type", apartment_ad_long_term_rent_model_1.ApartmentAdLongTermRentViewModel)
], FindLongTermRentAdResponse.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)(() => apartment_ad_postgres_interval_model_1.ApartmentAdTimeIntervalModel, { nullable: true }),
    __metadata("design:type", apartment_ad_postgres_interval_model_1.ApartmentAdTimeIntervalModel)
], FindLongTermRentAdResponse.prototype, "averageResponseOnRequest", void 0);
FindLongTermRentAdResponse = FindLongTermRentAdResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], FindLongTermRentAdResponse);
exports.FindLongTermRentAdResponse = FindLongTermRentAdResponse;
//# sourceMappingURL=find-long-term-rent-ad.response.js.map