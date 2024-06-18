import { ShortTermRentFilterBase } from '@domains/apartment-ad/base-classes/short-term-rent-filter-base/short-term-rent-filter.base.service';
import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { BaseOffsetPaginationRequest } from '@infrastructure/dto/base-offset-pagination.request.dto';
import { ShortTermRentLockedDateDocument } from '@infrastructure/elastic-search/documents/short-term-rent-locked-dates.document';
import { ShortTermRentRentedDateDocument } from '@infrastructure/elastic-search/documents/short-term-rent-rented-dates.document';
import {
  ShortTermRentDocument,
  ShortTermRentDocumentProps,
} from '@infrastructure/elastic-search/documents/short-term-rent.document';
import { elasticsearchCoreProvider } from '@infrastructure/elastic-search/elasticsearch-core.module';
import { QueryDslQueryContainer, SearchTemplateResponse, SearchTotalHits } from '@infrastructure/elastic-search/types';
import { OffsetPaginationResult, offsetPaginationService } from '@libs/utils/offset-paginaton-service';
import { Inject, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { FindShortTermRentAdsFilterRequest } from '../../dtos/find-short-term-rent-ads-filter.request';

@Injectable()
export class FindShortTermRentAdsService {
  private filter: ShortTermRentFilterBase;

  constructor(
    @Inject(elasticsearchCoreProvider.provide) private readonly elasticsearchService: ElasticsearchService,
    private readonly shortTermRentDocument: ShortTermRentDocument,
    shortTermRentLockedDateDocument: ShortTermRentLockedDateDocument,
    shortTermRentRentedDateDocument: ShortTermRentRentedDateDocument,
  ) {
    this.filter = new ShortTermRentFilterBase(
      elasticsearchService,
      shortTermRentLockedDateDocument,
      shortTermRentRentedDateDocument,
    );
  }

  async handle({
    filter,
    pagination,
  }: {
    filter: FindShortTermRentAdsFilterRequest;
    pagination: BaseOffsetPaginationRequest;
  }): Promise<OffsetPaginationResult<ShortTermRentOrmEntity>> {
    const paginationOffset = offsetPaginationService.getPaginationOffset({
      page: pagination.page,
      limit: pagination.limit,
    });

    const query = await this.buildQuery(filter);

    const resultDocuments = await this.elasticsearchService.search<SearchTemplateResponse<ShortTermRentDocumentProps>>({
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

    const isSearchTotalHits = (total: number | SearchTotalHits | undefined): total is SearchTotalHits => {
      return (total as SearchTotalHits).value !== undefined;
    };

    const totalItems = isSearchTotalHits(resultDocuments.body.hits.total)
      ? resultDocuments.body.hits.total.value
      : resultDocuments.body.hits.total || 0;

    const resultIds = resultDocuments.body.hits.hits.map((el) => el._id);

    const slugs = resultDocuments.body.hits.hits.map((el) => {
      return { id: el._id, slug: el._source?.slug ?? '' };
    });

    const maxCost = ((resultDocuments.body.aggregations?.maxCost as any)?.value || 0) as number;
    const minCost = ((resultDocuments.body.aggregations?.minCost as any)?.value || 0) as number;

    const resultOrmEntities = resultIds.length ? await ShortTermRentOrmEntity.query().findByIds(resultIds) : [];

    return offsetPaginationService.getPaginationResult<ShortTermRentOrmEntity>({
      data: resultOrmEntities,
      limit: pagination.limit,
      currentPage: pagination.page,
      totalItems,
      minCost,
      maxCost,
      slugs,
    });
  }

  private async buildQuery(inputFilters: FindShortTermRentAdsFilterRequest): Promise<QueryDslQueryContainer> {
    const filters: QueryDslQueryContainer[] = [];

    this.filter.applyBaseFilters(inputFilters, filters);

    this.filter.applyPriceRangeFilters(inputFilters, filters);

    this.filter.applyRulesWithGestAffectedFilters(inputFilters, filters);

    this.filter.applyCharacteristicsAffectedFilters(inputFilters, filters);

    this.filter.applyDetailsFilters(inputFilters, filters);

    this.filter.applyArrivalAndDepartureFilters(inputFilters, filters);

    this.filter.applyBookingAccessFilters(inputFilters, filters);

    const lockedAdIds: string[] = [];

    if (inputFilters.dateRange?.startDate || inputFilters.dateRange?.endDate) {
      const result = await this.filter.subtractLockedDatesFilters(inputFilters);

      lockedAdIds.push(...result);
    }

    if (inputFilters.dateRange?.startDate || inputFilters.dateRange?.endDate) {
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
}
