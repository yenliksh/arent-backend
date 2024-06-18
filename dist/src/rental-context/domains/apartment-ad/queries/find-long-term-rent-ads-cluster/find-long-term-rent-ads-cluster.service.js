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
exports.FindLongTermRentAdsClusterService = void 0;
const long_term_rent_filter_base_service_1 = require("../../base-classes/long-term-rent-filter-base/long-term-rent-filter.base.service");
const long_term_rent_document_1 = require("../../../../../infrastructure/elastic-search/documents/long-term-rent.document");
const elasticsearch_core_module_1 = require("../../../../../infrastructure/elastic-search/elasticsearch-core.module");
const common_1 = require("@nestjs/common");
const elasticsearch_1 = require("@nestjs/elasticsearch");
let FindLongTermRentAdsClusterService = class FindLongTermRentAdsClusterService {
    constructor(elasticsearchService, longTermRentDocument) {
        this.elasticsearchService = elasticsearchService;
        this.longTermRentDocument = longTermRentDocument;
        this.filter = new long_term_rent_filter_base_service_1.LongTermRentFilterBase();
    }
    async handle({ filter, }) {
        const query = this.buildQuery(filter);
        const maxOneTimeClustersAmount = 10000;
        const resultDocuments = await this.elasticsearchService.search({
            index: this.longTermRentDocument.indexName,
            body: {
                query,
                size: maxOneTimeClustersAmount,
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
        const slugs = resultDocuments.body.hits.hits.map((el) => {
            var _a, _b;
            return { id: el._id, slug: (_b = (_a = el._source) === null || _a === void 0 ? void 0 : _a.slug) !== null && _b !== void 0 ? _b : '' };
        });
        const documents = resultDocuments.body.hits.hits.map(({ _source }) => _source);
        return [documents, totalItems, slugs];
    }
    buildQuery(inputFilters) {
        const filters = [];
        this.filter.applyBaseFilters(inputFilters, filters);
        this.filter.applyPriceRangeFilters(inputFilters, filters);
        this.filter.applyRulesWithGestAffectedFilters(inputFilters, filters);
        this.filter.applyDetailsFilters(inputFilters, filters);
        return {
            bool: {
                filter: filters,
            },
        };
    }
};
FindLongTermRentAdsClusterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(elasticsearch_core_module_1.elasticsearchCoreProvider.provide)),
    __metadata("design:paramtypes", [elasticsearch_1.ElasticsearchService,
        long_term_rent_document_1.LongTermRentDocument])
], FindLongTermRentAdsClusterService);
exports.FindLongTermRentAdsClusterService = FindLongTermRentAdsClusterService;
//# sourceMappingURL=find-long-term-rent-ads-cluster.service.js.map