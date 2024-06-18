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
var FindLongTermRentAdsClusterResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindLongTermRentAdsClusterResponse = void 0;
const apartment_ad_cluster_info_model_1 = require("../../models/apartment-ad-cluster-info.model");
const apartment_ad_cluster_model_1 = require("../../models/apartment-ad-cluster.model");
const slug_model_1 = require("../../../../../infrastructure/models/slug.model");
const graphql_1 = require("@nestjs/graphql");
let FindLongTermRentAdsClusterResponse = FindLongTermRentAdsClusterResponse_1 = class FindLongTermRentAdsClusterResponse {
};
FindLongTermRentAdsClusterResponse.create = (data, totalItems, slugs) => {
    const payload = new FindLongTermRentAdsClusterResponse_1();
    payload.data = data.map((i) => apartment_ad_cluster_model_1.ApartmentAdClusterModel.create(i));
    payload.clusterInfo = apartment_ad_cluster_info_model_1.ApartmentAdClusterInfoModel.create({ totalItems });
    payload.slugs = slugs;
    return payload;
};
__decorate([
    (0, graphql_1.Field)(() => [apartment_ad_cluster_model_1.ApartmentAdClusterModel]),
    __metadata("design:type", Array)
], FindLongTermRentAdsClusterResponse.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)(() => apartment_ad_cluster_info_model_1.ApartmentAdClusterInfoModel),
    __metadata("design:type", apartment_ad_cluster_info_model_1.ApartmentAdClusterInfoModel)
], FindLongTermRentAdsClusterResponse.prototype, "clusterInfo", void 0);
__decorate([
    (0, graphql_1.Field)(() => [slug_model_1.SlugModel]),
    __metadata("design:type", Array)
], FindLongTermRentAdsClusterResponse.prototype, "slugs", void 0);
FindLongTermRentAdsClusterResponse = FindLongTermRentAdsClusterResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], FindLongTermRentAdsClusterResponse);
exports.FindLongTermRentAdsClusterResponse = FindLongTermRentAdsClusterResponse;
//# sourceMappingURL=find-long-term-rent-ads-cluster.response.js.map