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
var PublishApartmentAdResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishApartmentAdResponse = void 0;
const openapi = require("@nestjs/swagger");
const apartment_ad_model_1 = require("../../models/apartment-ad.model");
const long_term_rent_is_rented_problem_1 = require("../../problems/long-term-rent-is-rented.problem");
const problem_response_dto_1 = require("../../../../../libs/ddd/interface-adapters/dtos/problem.response.dto");
const graphql_1 = require("@nestjs/graphql");
let PublishApartmentAdResponse = PublishApartmentAdResponse_1 = class PublishApartmentAdResponse extends problem_response_dto_1.ProblemResponse {
    static create(props) {
        const payload = new PublishApartmentAdResponse_1();
        payload.apartmentAd = apartment_ad_model_1.ApartmentAdModel.create(props);
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { apartmentAd: { required: false, type: () => require("../../models/apartment-ad.model").ApartmentAdModel }, problem: { required: false, type: () => require("../../problems/long-term-rent-is-rented.problem").LongTermRentIsRentedProblem } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => apartment_ad_model_1.ApartmentAdModel, { nullable: true }),
    __metadata("design:type", apartment_ad_model_1.ApartmentAdModel)
], PublishApartmentAdResponse.prototype, "apartmentAd", void 0);
__decorate([
    (0, graphql_1.Field)(() => long_term_rent_is_rented_problem_1.LongTermRentIsRentedProblem, { nullable: true }),
    __metadata("design:type", long_term_rent_is_rented_problem_1.LongTermRentIsRentedProblem)
], PublishApartmentAdResponse.prototype, "problem", void 0);
PublishApartmentAdResponse = PublishApartmentAdResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], PublishApartmentAdResponse);
exports.PublishApartmentAdResponse = PublishApartmentAdResponse;
//# sourceMappingURL=publish-apartment-ad.response.dto.js.map