import { FindShortTermRentAdsFilterRequest } from '@domains/apartment-ad/dtos/find-short-term-rent-ads-filter.request';
import { ShortTermRentLockedDateDocument } from '@infrastructure/elastic-search/documents/short-term-rent-locked-dates.document';
import { ShortTermRentRentedDateDocument } from '@infrastructure/elastic-search/documents/short-term-rent-rented-dates.document';
import { QueryDslQueryContainer } from '@infrastructure/elastic-search/types';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ShortTermRentFilterPort } from './short-term-rent-filter.port';
export declare class ShortTermRentFilterBase implements ShortTermRentFilterPort {
    private readonly elasticsearchService;
    private readonly shortTermRentLockedDateDocument;
    private readonly shortTermRentRentedDateDocument;
    constructor(elasticsearchService: ElasticsearchService, shortTermRentLockedDateDocument: ShortTermRentLockedDateDocument, shortTermRentRentedDateDocument: ShortTermRentRentedDateDocument);
    applyBaseFilters(inputFilters: FindShortTermRentAdsFilterRequest, filters: QueryDslQueryContainer[]): void;
    applyPriceRangeFilters(inputFilters: FindShortTermRentAdsFilterRequest, filters: QueryDslQueryContainer[]): void;
    applyRulesWithGestAffectedFilters(inputFilters: FindShortTermRentAdsFilterRequest, filters: QueryDslQueryContainer[]): void;
    applyCharacteristicsAffectedFilters(inputFilters: FindShortTermRentAdsFilterRequest, filters: QueryDslQueryContainer[]): void;
    applyDetailsFilters(inputFilters: FindShortTermRentAdsFilterRequest, filters: QueryDslQueryContainer[]): void;
    applyArrivalAndDepartureFilters(inputFilters: FindShortTermRentAdsFilterRequest, filters: QueryDslQueryContainer[]): void;
    subtractLockedDatesFilters(inputFilters: FindShortTermRentAdsFilterRequest): Promise<string[]>;
    subtractRentedDatesFilters(inputFilters: FindShortTermRentAdsFilterRequest): Promise<string[]>;
    applyBookingAccessFilters(inputFilters: FindShortTermRentAdsFilterRequest, filters: QueryDslQueryContainer[]): void;
}
