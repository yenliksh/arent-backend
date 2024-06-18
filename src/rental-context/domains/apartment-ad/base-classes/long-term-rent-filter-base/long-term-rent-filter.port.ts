import { FindLongTermRentAdsFilterRequest } from '@domains/apartment-ad/dtos/find-long-term-rent-ads-filter.request';
import { QueryDslQueryContainer } from '@infrastructure/elastic-search/types';

export abstract class LongTermRentFilterPort {
  abstract applyBaseFilters(inputFilters: FindLongTermRentAdsFilterRequest, filters: QueryDslQueryContainer[]): void;

  abstract applyDetailsFilters(inputFilters: FindLongTermRentAdsFilterRequest, filters: QueryDslQueryContainer[]): void;

  abstract applyRulesWithGestAffectedFilters(
    inputFilters: FindLongTermRentAdsFilterRequest,
    filters: QueryDslQueryContainer[],
  ): void;

  abstract applyPriceRangeFilters(
    inputFilters: FindLongTermRentAdsFilterRequest,
    filters: QueryDslQueryContainer[],
  ): void;
}
