import { ShortTermRentFilterBase } from '@domains/apartment-ad/base-classes/short-term-rent-filter-base/short-term-rent-filter.base.service';
import { FindShortTermRentAdsFilterRequest } from '@domains/apartment-ad/dtos/find-short-term-rent-ads-filter.request';
import { ShortTermRentLockedDateDocument } from '@infrastructure/elastic-search/documents/short-term-rent-locked-dates.document';
import { ShortTermRentRentedDateDocument } from '@infrastructure/elastic-search/documents/short-term-rent-rented-dates.document';
import {
  ShortTermRentDocument,
  ShortTermRentDocumentProps,
} from '@infrastructure/elastic-search/documents/short-term-rent.document';
import { elasticsearchCoreProvider } from '@infrastructure/elastic-search/elasticsearch-core.module';
import { QueryDslQueryContainer, SearchTemplateResponse, SearchTotalHits } from '@infrastructure/elastic-search/types';
import { SlugModel } from '@infrastructure/models/slug.model';
import { Inject, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class FindShortTermRentAdsClusterService {
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
  }: {
    filter: FindShortTermRentAdsFilterRequest;
  }): Promise<[ShortTermRentDocumentProps[], number, SlugModel[]]> {
    const query = await this.buildQuery(filter);

    const maxOneTimeClustersAmount = 10000;

    const resultDocuments = await this.elasticsearchService.search<SearchTemplateResponse<ShortTermRentDocumentProps>>({
      index: this.shortTermRentDocument.indexName,
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

    const documents: ShortTermRentDocumentProps[] = resultDocuments.body.hits.hits.map(
      ({ _source }) => _source,
    ) as ShortTermRentDocumentProps[];

    return [documents, totalItems, slugs];
  }

  private async buildQuery(inputFilters: FindShortTermRentAdsFilterRequest): Promise<QueryDslQueryContainer> {
    const filters: QueryDslQueryContainer[] = [];

    this.filter.applyBaseFilters(inputFilters, filters);

    this.filter.applyPriceRangeFilters(inputFilters, filters);

    this.filter.applyRulesWithGestAffectedFilters(inputFilters, filters);

    this.filter.applyDetailsFilters(inputFilters, filters);

    this.filter.applyArrivalAndDepartureFilters(inputFilters, filters);

    this.filter.applyBookingAccessFilters(inputFilters, filters);

    const lockedAdIds: string[] = [];

    if (inputFilters.dateRange?.startDate || inputFilters.dateRange?.endDate) {
      const result = await this.filter.subtractLockedDatesFilters(inputFilters);

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
