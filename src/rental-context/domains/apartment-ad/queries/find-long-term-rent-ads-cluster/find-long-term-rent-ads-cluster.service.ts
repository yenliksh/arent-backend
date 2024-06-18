import { LongTermRentFilterBase } from '@domains/apartment-ad/base-classes/long-term-rent-filter-base/long-term-rent-filter.base.service';
import {
  LongTermRentDocument,
  LongTermRentDocumentProps,
} from '@infrastructure/elastic-search/documents/long-term-rent.document';
import { elasticsearchCoreProvider } from '@infrastructure/elastic-search/elasticsearch-core.module';
import { QueryDslQueryContainer, SearchTemplateResponse, SearchTotalHits } from '@infrastructure/elastic-search/types';
import { SlugModel } from '@infrastructure/models/slug.model';
import { Inject, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { FindLongTermRentAdsFilterRequest } from '../../dtos/find-long-term-rent-ads-filter.request';

@Injectable()
export class FindLongTermRentAdsClusterService {
  private filter: LongTermRentFilterBase;

  constructor(
    @Inject(elasticsearchCoreProvider.provide) private readonly elasticsearchService: ElasticsearchService,
    private readonly longTermRentDocument: LongTermRentDocument,
  ) {
    this.filter = new LongTermRentFilterBase();
  }

  async handle({
    filter,
  }: {
    filter: FindLongTermRentAdsFilterRequest;
  }): Promise<[LongTermRentDocumentProps[], number, SlugModel[]]> {
    const query = this.buildQuery(filter);

    const maxOneTimeClustersAmount = 10000;

    const resultDocuments = await this.elasticsearchService.search<SearchTemplateResponse<LongTermRentDocumentProps>>({
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

    const isSearchTotalHits = (total: number | SearchTotalHits | undefined): total is SearchTotalHits => {
      return (total as SearchTotalHits).value !== undefined;
    };

    const totalItems = isSearchTotalHits(resultDocuments.body.hits.total)
      ? resultDocuments.body.hits.total.value
      : resultDocuments.body.hits.total || 0;

    const slugs = resultDocuments.body.hits.hits.map((el) => {
      return { id: el._id, slug: el._source?.slug ?? '' };
    });

    const documents: LongTermRentDocumentProps[] = resultDocuments.body.hits.hits.map(
      ({ _source }) => _source,
    ) as LongTermRentDocumentProps[];

    return [documents, totalItems, slugs];
  }

  private buildQuery(inputFilters: FindLongTermRentAdsFilterRequest): QueryDslQueryContainer {
    const filters: QueryDslQueryContainer[] = [];

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
}
