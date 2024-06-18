import { FindLongTermRentAdsFilterRequest } from '@domains/apartment-ad/dtos/find-long-term-rent-ads-filter.request';
import { FindShortTermRentAdsFilterRequest } from '@domains/apartment-ad/dtos/find-short-term-rent-ads-filter.request';
import { QueryDslQueryContainer } from '@infrastructure/elastic-search/types';
import { LongTermRentFilterPort } from './long-term-rent-filter.port';
export declare class LongTermRentFilterBase implements LongTermRentFilterPort {
    applyBaseFilters(inputFilters: FindLongTermRentAdsFilterRequest, filters: QueryDslQueryContainer[]): void;
    applyPriceRangeFilters(inputFilters: FindLongTermRentAdsFilterRequest, filters: QueryDslQueryContainer[]): void;
    applyRulesWithGestAffectedFilters(inputFilters: FindLongTermRentAdsFilterRequest, filters: QueryDslQueryContainer[]): void;
    applyCharacteristicsAffectedFilters(inputFilters: FindShortTermRentAdsFilterRequest, filters: QueryDslQueryContainer[]): void;
    applyDetailsFilters(inputFilters: FindLongTermRentAdsFilterRequest, filters: QueryDslQueryContainer[]): void;
}
