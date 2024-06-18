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
var ApartmentAdResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdResponse = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const apartment_ad_model_1 = require("../models/apartment-ad.model");
let ApartmentAdResponse = ApartmentAdResponse_1 = class ApartmentAdResponse {
    static create(props) {
        const payload = new ApartmentAdResponse_1();
        payload.apartmentAd = apartment_ad_model_1.ApartmentAdModel.create(props);
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { apartmentAd: { required: true, type: () => require("../models/apartment-ad.model").ApartmentAdModel } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => apartment_ad_model_1.ApartmentAdModel),
    __metadata("design:type", apartment_ad_model_1.ApartmentAdModel)
], ApartmentAdResponse.prototype, "apartmentAd", void 0);
ApartmentAdResponse = ApartmentAdResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], ApartmentAdResponse);
exports.ApartmentAdResponse = ApartmentAdResponse;
//# sourceMappingURL=apartment-ad.response.dto.js.map