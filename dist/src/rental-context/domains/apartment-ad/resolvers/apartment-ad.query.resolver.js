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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdQueryGraphqlResolver = void 0;
const iam_decorator_1 = require("../../../../infrastructure/decorators/iam.decorator");
const base_offset_pagination_request_dto_1 = require("../../../../infrastructure/dto/base-offset-pagination.request.dto");
const guards_1 = require("../../../../infrastructure/guards");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const find_apartment_ad_identificator_request_dto_1 = require("../commands/find-apartment-ad-identificator/find-apartment-ad-identificator.request.dto");
const find_apartment_ad_identificator_service_1 = require("../commands/find-apartment-ad-identificator/find-apartment-ad-identificator.service");
const find_apartment_ads_identificators_request_dto_1 = require("../commands/find-apartment-ad-identificator/find-apartment-ads-identificators.request.dto");
const apartment_ad_identificator_response_dto_1 = require("../dtos/apartment-ad-identificator.response.dto");
const apartment_ad_slug_response_dto_1 = require("../dtos/apartment-ad-slug-response.dto");
const apartment_ads_slug_response_dto_1 = require("../dtos/apartment-ads-slug-response.dto");
const apartment_ads_union_response_dto_1 = require("../dtos/apartment-ads-union.response.dto");
const find_long_term_rent_ads_filter_request_1 = require("../dtos/find-long-term-rent-ads-filter.request");
const find_short_term_rent_ads_filter_request_1 = require("../dtos/find-short-term-rent-ads-filter.request");
const apartment_ad_model_1 = require("../models/apartment-ad.model");
const find_long_term_rent_ad_request_1 = require("../queries/find-long-term-rent-ad/find-long-term-rent-ad.request");
const find_long_term_rent_ad_response_1 = require("../queries/find-long-term-rent-ad/find-long-term-rent-ad.response");
const find_long_term_rent_ad_service_1 = require("../queries/find-long-term-rent-ad/find-long-term-rent-ad.service");
const find_long_term_rent_ads_cluster_response_1 = require("../queries/find-long-term-rent-ads-cluster/find-long-term-rent-ads-cluster.response");
const find_long_term_rent_ads_cluster_service_1 = require("../queries/find-long-term-rent-ads-cluster/find-long-term-rent-ads-cluster.service");
const find_long_term_rent_ads_response_1 = require("../queries/find-long-term-rent-ads/find-long-term-rent-ads.response");
const find_long_term_rent_ads_service_1 = require("../queries/find-long-term-rent-ads/find-long-term-rent-ads.service");
const find_short_term_rent_ad_request_1 = require("../queries/find-short-term-rent-ad/find-short-term-rent-ad.request");
const find_short_term_rent_ad_response_1 = require("../queries/find-short-term-rent-ad/find-short-term-rent-ad.response");
const find_short_term_rent_ad_service_1 = require("../queries/find-short-term-rent-ad/find-short-term-rent-ad.service");
const find_short_term_rent_ads_cluster_response_1 = require("../queries/find-short-term-rent-ads-cluster/find-short-term-rent-ads-cluster.response");
const find_short_term_rent_ads_cluster_service_1 = require("../queries/find-short-term-rent-ads-cluster/find-short-term-rent-ads-cluster.service");
const find_short_term_rent_ads_response_1 = require("../queries/find-short-term-rent-ads/find-short-term-rent-ads.response");
const find_short_term_rent_ads_service_1 = require("../queries/find-short-term-rent-ads/find-short-term-rent-ads.service");
const my_apartment_ad_status_count_responce_1 = require("../queries/my-apartment-ad-status-count/my-apartment-ad-status-count.responce");
const my_apartment_ad_status_count_service_1 = require("../queries/my-apartment-ad-status-count/my-apartment-ad-status-count.service");
const my_apartment_ad_request_1 = require("../queries/my-apartment-ad/my-apartment-ad.request");
const my_apartment_ad_service_1 = require("../queries/my-apartment-ad/my-apartment-ad.service");
const my_apartment_ads_request_1 = require("../queries/my-apartment-ads/my-apartment-ads.request");
const my_apartment_ads_service_1 = require("../queries/my-apartment-ads/my-apartment-ads.service");
let ApartmentAdQueryGraphqlResolver = class ApartmentAdQueryGraphqlResolver {
    constructor(findMyApartmentAdService, findMyApartmentAdsService, findMyApartmentAdStatusCountService, findLongTermRentAdsService, findLongTermRentAdService, findShortTermRentAdsService, findShortTermRentAdService, findShortTermRentAdsClusterService, findLongTermRentAdsClusterService, findApartmentAdIdentificatorService) {
        this.findMyApartmentAdService = findMyApartmentAdService;
        this.findMyApartmentAdsService = findMyApartmentAdsService;
        this.findMyApartmentAdStatusCountService = findMyApartmentAdStatusCountService;
        this.findLongTermRentAdsService = findLongTermRentAdsService;
        this.findLongTermRentAdService = findLongTermRentAdService;
        this.findShortTermRentAdsService = findShortTermRentAdsService;
        this.findShortTermRentAdService = findShortTermRentAdService;
        this.findShortTermRentAdsClusterService = findShortTermRentAdsClusterService;
        this.findLongTermRentAdsClusterService = findLongTermRentAdsClusterService;
        this.findApartmentAdIdentificatorService = findApartmentAdIdentificatorService;
    }
    async findMyApartmentAd(userId, input) {
        const result = await this.findMyApartmentAdService.handle(input, userId);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return apartment_ad_model_1.ApartmentAdModel.create(result.unwrap());
    }
    async findMyApartmentAds(userId, input) {
        const result = await this.findMyApartmentAdsService.handle(input, userId);
        const [shortTermRent, longTermRent] = result.unwrap();
        return apartment_ads_union_response_dto_1.ApartmentAdsUnionResponse.create([shortTermRent, longTermRent]);
    }
    async apartmentAdStatusCount(userId) {
        const result = await this.findMyApartmentAdStatusCountService.handle(userId);
        return result.unwrap();
    }
    async findLongTermRentAds(filter, pagination) {
        const result = await this.findLongTermRentAdsService.handle({ filter, pagination });
        return find_long_term_rent_ads_response_1.FindLongTermRentAdsResponse.create(result);
    }
    async findLongTermRentAdsCluster(filter) {
        const [documents, totalItems, slugs] = await this.findLongTermRentAdsClusterService.handle({ filter });
        return find_long_term_rent_ads_cluster_response_1.FindLongTermRentAdsClusterResponse.create(documents, totalItems, slugs);
    }
    async findShortTermRentAds(filter, pagination) {
        const result = await this.findShortTermRentAdsService.handle({ filter, pagination });
        return find_short_term_rent_ads_response_1.FindShortTermRentAdsResponse.create(result);
    }
    async findShortTermRentAdsCluster(filter) {
        const [documents, totalItems, slugs] = await this.findShortTermRentAdsClusterService.handle({ filter });
        return find_short_term_rent_ads_cluster_response_1.FindShortTermRentAdsClusterResponse.create(documents, totalItems, slugs);
    }
    async findShortTermRentAd(dto) {
        const result = await this.findShortTermRentAdService.handle(dto);
        if (!result) {
            return null;
        }
        const { shortTermRent, averageResponseOnRequest } = result;
        return find_short_term_rent_ad_response_1.FindShortTermRentAdResponse.create(shortTermRent, averageResponseOnRequest);
    }
    async findShortTermRentAdByApartmentId(dto) {
        const result = await this.findShortTermRentAdService.handleByApId(dto);
        if (!result) {
            return null;
        }
        const { shortTermRent, averageResponseOnRequest } = result;
        return find_short_term_rent_ad_response_1.FindShortTermRentAdResponse.create(shortTermRent, averageResponseOnRequest);
    }
    async findLongTermRentAd(dto, userId) {
        const result = await this.findLongTermRentAdService.handle(dto, userId);
        if (!result) {
            return null;
        }
        const { longTermRent, averageResponseOnRequest } = result;
        return find_long_term_rent_ad_response_1.FindLongTermRentAdResponse.create(longTermRent, averageResponseOnRequest);
    }
    async findLongTermRentAdByApId(dto, userId) {
        const result = await this.findLongTermRentAdService.handleByApId(dto, userId);
        if (!result) {
            return null;
        }
        const { longTermRent, averageResponseOnRequest } = result;
        return find_long_term_rent_ad_response_1.FindLongTermRentAdResponse.create(longTermRent, averageResponseOnRequest);
    }
    async createApartmentAdIdentificatorFind(input) {
        const result = await this.findApartmentAdIdentificatorService.handle(input);
        const apartmentAd = result.unwrap().getPropsCopy();
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return apartment_ad_identificator_response_dto_1.ApartmentAdIdentificatorResponse.create({
            apartmentId: apartmentAd.apartmentId.value,
            titleSeo: apartmentAd.titleSeo,
            keywordsSeo: apartmentAd.keywordsSeo,
            descriptionSeo: apartmentAd.descriptionSeo,
        });
    }
    async createApartmentAdIdentificatorFindByApId(input) {
        const result = await this.findApartmentAdIdentificatorService.handleByApId(input);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return apartment_ad_slug_response_dto_1.ApartmentAdSlugResponse.create({
            titleSeo: result.unwrap().titleSeo,
            adSearchId: result.unwrap().adSearchId,
        });
    }
    async createApartmentAdIdentificatorsFindByApIds(input) {
        const result = await this.findApartmentAdIdentificatorService.handleByApIds(input);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return apartment_ads_slug_response_dto_1.ApartmentAdsSlugResponse.create({
            apAdIds: result.unwrap(),
        });
    }
};
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Query)(() => apartment_ad_model_1.ApartmentAdModel, { name: 'rentAd__myRentAd' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, my_apartment_ad_request_1.MyApartmentAdRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdQueryGraphqlResolver.prototype, "findMyApartmentAd", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Query)(() => apartment_ads_union_response_dto_1.ApartmentAdsUnionResponse, { name: 'rentAd__myRentAd_unionRentPeriods' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, my_apartment_ads_request_1.MyApartmentAdsRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdQueryGraphqlResolver.prototype, "findMyApartmentAds", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Query)(() => my_apartment_ad_status_count_responce_1.MyApartmentAdStatusCountResponse, { name: 'rentAd__myRentAd_statusCount' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApartmentAdQueryGraphqlResolver.prototype, "apartmentAdStatusCount", null);
__decorate([
    (0, graphql_1.Query)(() => find_long_term_rent_ads_response_1.FindLongTermRentAdsResponse, { name: 'rentAd__find_longTermAds' }),
    __param(0, (0, graphql_1.Args)('filter')),
    __param(1, (0, graphql_1.Args)('pagination')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_long_term_rent_ads_filter_request_1.FindLongTermRentAdsFilterRequest,
        base_offset_pagination_request_dto_1.BaseOffsetPaginationRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdQueryGraphqlResolver.prototype, "findLongTermRentAds", null);
__decorate([
    (0, graphql_1.Query)(() => find_long_term_rent_ads_cluster_response_1.FindLongTermRentAdsClusterResponse, { name: 'rentAd__find_longTermAdsCluster' }),
    __param(0, (0, graphql_1.Args)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_long_term_rent_ads_filter_request_1.FindLongTermRentAdsFilterRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdQueryGraphqlResolver.prototype, "findLongTermRentAdsCluster", null);
__decorate([
    (0, graphql_1.Query)(() => find_short_term_rent_ads_response_1.FindShortTermRentAdsResponse, { name: 'rentAd__find_shortTermAds' }),
    __param(0, (0, graphql_1.Args)('filter')),
    __param(1, (0, graphql_1.Args)('pagination')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_short_term_rent_ads_filter_request_1.FindShortTermRentAdsFilterRequest,
        base_offset_pagination_request_dto_1.BaseOffsetPaginationRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdQueryGraphqlResolver.prototype, "findShortTermRentAds", null);
__decorate([
    (0, graphql_1.Query)(() => find_short_term_rent_ads_cluster_response_1.FindShortTermRentAdsClusterResponse, { name: 'rentAd__find_shortTermAdsCluster' }),
    __param(0, (0, graphql_1.Args)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_short_term_rent_ads_filter_request_1.FindShortTermRentAdsFilterRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdQueryGraphqlResolver.prototype, "findShortTermRentAdsCluster", null);
__decorate([
    (0, graphql_1.Query)(() => find_short_term_rent_ad_response_1.FindShortTermRentAdResponse, { nullable: true, name: 'rentAd__find_shortTermRentAd' }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_short_term_rent_ad_request_1.FindShortTermRentAdRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdQueryGraphqlResolver.prototype, "findShortTermRentAd", null);
__decorate([
    (0, graphql_1.Query)(() => find_short_term_rent_ad_response_1.FindShortTermRentAdResponse, { nullable: true, name: 'rentAd__find_shortTermAdByApartmentId' }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_short_term_rent_ad_request_1.FindShortTermRentAdRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdQueryGraphqlResolver.prototype, "findShortTermRentAdByApartmentId", null);
__decorate([
    (0, graphql_1.Query)(() => find_long_term_rent_ad_response_1.FindLongTermRentAdResponse, { nullable: true, name: 'rentAd__find_longTermAd' }),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, iam_decorator_1.IAM)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_long_term_rent_ad_request_1.FindLongTermRentAdRequest, String]),
    __metadata("design:returntype", Promise)
], ApartmentAdQueryGraphqlResolver.prototype, "findLongTermRentAd", null);
__decorate([
    (0, graphql_1.Query)(() => find_long_term_rent_ad_response_1.FindLongTermRentAdResponse, { nullable: true, name: 'rentAd__find_longTermAdByApId' }),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, iam_decorator_1.IAM)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_long_term_rent_ad_request_1.FindLongTermRentAdRequest, String]),
    __metadata("design:returntype", Promise)
], ApartmentAdQueryGraphqlResolver.prototype, "findLongTermRentAdByApId", null);
__decorate([
    (0, graphql_1.Query)(() => apartment_ad_identificator_response_dto_1.ApartmentAdIdentificatorResponse, { name: 'rentAdIdentificator__find' }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_apartment_ad_identificator_request_dto_1.FindApartmentAdIdentificatorRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdQueryGraphqlResolver.prototype, "createApartmentAdIdentificatorFind", null);
__decorate([
    (0, graphql_1.Query)(() => apartment_ad_slug_response_dto_1.ApartmentAdSlugResponse, { name: 'rentAdIdentificator__findByRentId' }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_apartment_ad_identificator_request_dto_1.FindApartmentAdIdentificatorRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdQueryGraphqlResolver.prototype, "createApartmentAdIdentificatorFindByApId", null);
__decorate([
    (0, graphql_1.Query)(() => apartment_ads_slug_response_dto_1.ApartmentAdsSlugResponse, { name: 'rentAdIdentificators__findByRentIds' }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_apartment_ads_identificators_request_dto_1.FindApartmentAdsIdentificatorsRequest]),
    __metadata("design:returntype", Promise)
], ApartmentAdQueryGraphqlResolver.prototype, "createApartmentAdIdentificatorsFindByApIds", null);
ApartmentAdQueryGraphqlResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [my_apartment_ad_service_1.MyApartmentAdService,
        my_apartment_ads_service_1.MyApartmentAdsService,
        my_apartment_ad_status_count_service_1.MyApartmentAdStatusCountService,
        find_long_term_rent_ads_service_1.FindLongTermRentAdsService,
        find_long_term_rent_ad_service_1.FindLongTermRentAdService,
        find_short_term_rent_ads_service_1.FindShortTermRentAdsService,
        find_short_term_rent_ad_service_1.FindShortTermRentAdService,
        find_short_term_rent_ads_cluster_service_1.FindShortTermRentAdsClusterService,
        find_long_term_rent_ads_cluster_service_1.FindLongTermRentAdsClusterService,
        find_apartment_ad_identificator_service_1.FindApartmentAdIdentificatorService])
], ApartmentAdQueryGraphqlResolver);
exports.ApartmentAdQueryGraphqlResolver = ApartmentAdQueryGraphqlResolver;
//# sourceMappingURL=apartment-ad.query.resolver.js.map