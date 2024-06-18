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
exports.FindShortTermRentAdsService = void 0;
const short_term_rent_filter_base_service_1 = require("../../base-classes/short-term-rent-filter-base/short-term-rent-filter.base.service");
const short_term_rent_orm_entity_1 = require("../../../../../infrastructure/database/entities/short-term-rent.orm-entity");
const short_term_rent_locked_dates_document_1 = require("../../../../../infrastructure/elastic-search/documents/short-term-rent-locked-dates.document");
const short_term_rent_rented_dates_document_1 = require("../../../../../infrastructure/elastic-search/documents/short-term-rent-rented-dates.document");
const short_term_rent_document_1 = require("../../../../../infrastructure/elastic-search/documents/short-term-rent.document");
const elasticsearch_core_module_1 = require("../../../../../infrastructure/elastic-search/elasticsearch-core.module");
const offset_paginaton_service_1 = require("../../../../../libs/utils/offset-paginaton-service");
const common_1 = require("@nestjs/common");
const elasticsearch_1 = require("@nestjs/elasticsearch");
let FindShortTermRentAdsService = class FindShortTermRentAdsService {
    constructor(elasticsearchService, shortTermRentDocument, shortTermRentLockedDateDocument, shortTermRentRentedDateDocument) {
        this.elasticsearchService = elasticsearchService;
        this.shortTermRentDocument = shortTermRentDocument;
        this.filter = new short_term_rent_filter_base_service_1.ShortTermRentFilterBase(elasticsearchService, shortTermRentLockedDateDocument, shortTermRentRentedDateDocument);
    }
    async handle({ filter, pagination, }) {
        var _a, _b, _c, _d;
        const paginationOffset = offset_paginaton_service_1.offsetPaginationService.getPaginationOffset({
            page: pagination.page,
            limit: pagination.limit,
        });
        const query = await this.buildQuery(filter);
        const resultDocuments = await this.elasticsearchService.search({
            index: this.shortTermRentDocument.indexName,
            body: {
                query,
                aggs: {
                    maxCost: {
                        max: {
                            field: 'cost',
                        },
                    },
                    minCost: {
                        min: {
                            field: 'cost',
                        },
                    },
                },
                from: paginationOffset,
                size: pagination.limit,
                sort: {
                    createdAt: {
                        order: 'desc',
                    },
                },
            },
        });
        const isSearchTotalHits = (total) => {
            return total.value !== undefined;
        };
        const totalItems = isSearchTotalHits(resultDocuments.body.hits.total)
            ? resultDocuments.body.hits.total.value
            : resultDocuments.body.hits.total || 0;
        const resultIds = resultDocuments.body.hits.hits.map((el) => el._id);
        const slugs = resultDocuments.body.hits.hits.map((el) => {
            var _a, _b;
            return { id: el._id, slug: (_b = (_a = el._source) === null || _a === void 0 ? void 0 : _a.slug) !== null && _b !== void 0 ? _b : '' };
        });
        const maxCost = (((_b = (_a = resultDocuments.body.aggregations) === null || _a === void 0 ? void 0 : _a.maxCost) === null || _b === void 0 ? void 0 : _b.value) || 0);
        const minCost = (((_d = (_c = resultDocuments.body.aggregations) === null || _c === void 0 ? void 0 : _c.minCost) === null || _d === void 0 ? void 0 : _d.value) || 0);
        const resultOrmEntities = resultIds.length ? await short_term_rent_orm_entity_1.ShortTermRentOrmEntity.query().findByIds(resultIds) : [];
        return offset_paginaton_service_1.offsetPaginationService.getPaginationResult({
            data: resultOrmEntities,
            limit: pagination.limit,
            currentPage: pagination.page,
            totalItems,
            minCost,
            maxCost,
            slugs,
        });
    }
    async buildQuery(inputFilters) {
        var _a, _b, _c, _d;
        const filters = [];
        this.filter.applyBaseFilters(inputFilters, filters);
        this.filter.applyPriceRangeFilters(inputFilters, filters);
        this.filter.applyRulesWithGestAffectedFilters(inputFilters, filters);
        this.filter.applyCharacteristicsAffectedFilters(inputFilters, filters);
        this.filter.applyDetailsFilters(inputFilters, filters);
        this.filter.applyArrivalAndDepartureFilters(inputFilters, filters);
        this.filter.applyBookingAccessFilters(inputFilters, filters);
        const lockedAdIds = [];
        if (((_a = inputFilters.dateRange) === null || _a === void 0 ? void 0 : _a.startDate) || ((_b = inputFilters.dateRange) === null || _b === void 0 ? void 0 : _b.endDate)) {
            const result = await this.filter.subtractLockedDatesFilters(inputFilters);
            lockedAdIds.push(...result);
        }
        if (((_c = inputFilters.dateRange) === null || _c === void 0 ? void 0 : _c.startDate) || ((_d = inputFilters.dateRange) === null || _d === void 0 ? void 0 : _d.endDate)) {
            const result = await this.filter.subtractRentedDatesFilters(inputFilters);
            lockedAdIds.push(...result);
        }
        if (lockedAdIds.length) {
            filters.push({
                bool: {
                    must_not: {
                        terms: {
                            id: [...new Set(lockedAdIds)],
                        },
                    },
                },
            });
        }
        return {
            bool: {
                filter: filters,
            },
        };
    }
};
FindShortTermRentAdsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(elasticsearch_core_module_1.elasticsearchCoreProvider.provide)),
    __metadata("design:paramtypes", [elasticsearch_1.ElasticsearchService,
        short_term_rent_document_1.ShortTermRentDocument,
        short_term_rent_locked_dates_document_1.ShortTermRentLockedDateDocument,
        short_term_rent_rented_dates_document_1.ShortTermRentRentedDateDocument])
], FindShortTermRentAdsService);
exports.FindShortTermRentAdsService = FindShortTermRentAdsService;
//# sourceMappingURL=find-short-term-rent-ads.service.js.map