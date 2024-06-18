import { LongTermRentFilterBase } from '@domains/apartment-ad/base-classes/long-term-rent-filter-base/long-term-rent-filter.base.service';
import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { BaseOffsetPaginationRequest } from '@infrastructure/dto/base-offset-pagination.request.dto';
import {
  LongTermRentDocument,
  LongTermRentDocumentProps,
} from '@infrastructure/elastic-search/documents/long-term-rent.document';
import { elasticsearchCoreProvider } from '@infrastructure/elastic-search/elasticsearch-core.module';
import { QueryDslQueryContainer, SearchTemplateResponse, SearchTotalHits } from '@infrastructure/elastic-search/types';
import { OffsetPaginationResult, offsetPaginationService } from '@libs/utils/offset-paginaton-service';
import { Inject, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { FindLongTermRentAdsFilterRequest } from '../../dtos/find-long-term-rent-ads-filter.request';

@Injectable()
export class FindLongTermRentAdsService {
  private filter: LongTermRentFilterBase;

  constructor(
    @Inject(elasticsearchCoreProvider.provide) private readonly elasticsearchService: ElasticsearchService,
    private readonly longTermRentDocument: LongTermRentDocument,
  ) {
    this.filter = new LongTermRentFilterBase();
  }

  async handle({
    filter,
    pagination,
  }: {
    filter: FindLongTermRentAdsFilterRequest;
    pagination: BaseOffsetPaginationRequest;
  }): Promise<OffsetPaginationResult<LongTermRentOrmEntity>> {
    const paginationOffset = offsetPaginationService.getPaginationOffset({
      page: pagination.page,
      limit: pagination.limit,
    });

    const query = this.buildQuery(filter);

    const resultDocuments = await this.elasticsearchService.search<SearchTemplateResponse<LongTermRentDocumentProps>>({
      index: this.longTermRentDocument.indexName,
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

    const resultOrmEntities = resultIds.length ? await LongTermRentOrmEntity.query().findByIds(resultIds) : [];

    return offsetPaginationService.getPaginationResult<LongTermRentOrmEntity>({
      data: resultOrmEntities,
      limit: pagination.limit,
      currentPage: pagination.page,
      totalItems,
      minCost,
      maxCost,
      slugs,
    });
  }

  private buildQuery(inputFilters: FindLongTermRentAdsFilterRequest): QueryDslQueryContainer {
    const filters: QueryDslQueryContainer[] = [];

    this.filter.applyBaseFilters(inputFilters, filters);

    this.filter.applyCharacteristicsAffectedFilters(inputFilters, filters);

    this.filter.applyPriceRangeFilters(inputFilters, filters);

    this.filter.applyRulesWithGestAffectedFilters(inputFilters, filters);

    this.filter.applyDetailsFilters(inputFilters, filters);

    return {
      bool: {
        filter: filters,
      },
    };
  }
}
