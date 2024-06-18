import { FindShortTermRentAdsFilterRequest } from '@domains/apartment-ad/dtos/find-short-term-rent-ads-filter.request';
import { QueryDslQueryContainer } from '@infrastructure/elastic-search/types';

export abstract class ShortTermRentFilterPort {
  abstract applyBaseFilters(inputFilters: FindShortTermRentAdsFilterRequest, filters: QueryDslQueryContainer[]): void;

  abstract applyRulesWithGestAffectedFilters(
    inputFilters: FindShortTermRentAdsFilterRequest,
    filters: QueryDslQueryContainer[],
  ): void;

  abstract applyCharacteristicsAffectedFilters(
    inputFilters: FindShortTermRentAdsFilterRequest,
    filters: QueryDslQueryContainer[],
  ): void;

  abstract applyArrivalAndDepartureFilters(
    inputFilters: FindShortTermRentAdsFilterRequest,
    filters: QueryDslQueryContainer[],
  ): void;

  abstract applyPriceRangeFilters(
    inputFilters: FindShortTermRentAdsFilterRequest,
    filters: QueryDslQueryContainer[],
  ): void;

  abstract applyDetailsFilters(
    inputFilters: FindShortTermRentAdsFilterRequest,
    filters: QueryDslQueryContainer[],
  ): void;

  abstract applyBookingAccessFilters(
    inputFilters: FindShortTermRentAdsFilterRequest,
    filters: QueryDslQueryContainer[],
  ): void;

  abstract subtractLockedDatesFilters(inputFilters: FindShortTermRentAdsFilterRequest): Promise<string[]>;

  abstract subtractRentedDatesFilters(inputFilters: FindShortTermRentAdsFilterRequest): Promise<string[]>;
}
