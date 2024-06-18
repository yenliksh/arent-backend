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
var FindShortTermRentAdsResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindShortTermRentAdsResponse = void 0;
const base_offset_pagination_response_dto_1 = require("../../../../../infrastructure/dto/base-offset-pagination.response.dto");
const base_price_info_model_1 = require("../../../../../infrastructure/models/base-price-info.model");
const slug_model_1 = require("../../../../../infrastructure/models/slug.model");
const graphql_1 = require("@nestjs/graphql");
const apartment_ad_short_term_rent_model_1 = require("../../models/apartment-ad-short-term-rent.model");
let FindShortTermRentAdsResponse = FindShortTermRentAdsResponse_1 = class FindShortTermRentAdsResponse extends (0, base_offset_pagination_response_dto_1.BaseOffsetPaginationResponse)(apartment_ad_short_term_rent_model_1.ApartmentAdShortTermRentViewModel) {
};
FindShortTermRentAdsResponse.create = (props) => {
    var _a;
    const payload = new FindShortTermRentAdsResponse_1();
    payload.data = props.data.map((i) => apartment_ad_short_term_rent_model_1.ApartmentAdShortTermRentViewModel.create(i));
    payload.pageInfo = props.pageInfo;
    payload.priceInfo = base_price_info_model_1.BasePriceInfoModel.create(props.priceInfo);
    payload.slugs = (_a = props.slugs) === null || _a === void 0 ? void 0 : _a.map((i) => { var _a; return slug_model_1.SlugModel.create({ id: i.id, slug: (_a = i.slug) !== null && _a !== void 0 ? _a : '' }); });
    return payload;
};
__decorate([
    (0, graphql_1.Field)(() => base_price_info_model_1.BasePriceInfoModel),
    __metadata("design:type", base_price_info_model_1.BasePriceInfoModel)
], FindShortTermRentAdsResponse.prototype, "priceInfo", void 0);
__decorate([
    (0, graphql_1.Field)(() => [slug_model_1.SlugModel]),
    __metadata("design:type", Array)
], FindShortTermRentAdsResponse.prototype, "slugs", void 0);
FindShortTermRentAdsResponse = FindShortTermRentAdsResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], FindShortTermRentAdsResponse);
exports.FindShortTermRentAdsResponse = FindShortTermRentAdsResponse;
//# sourceMappingURL=find-short-term-rent-ads.response.js.map