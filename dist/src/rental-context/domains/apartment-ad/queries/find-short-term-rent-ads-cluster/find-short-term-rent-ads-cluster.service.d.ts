import { FindShortTermRentAdsFilterRequest } from '@domains/apartment-ad/dtos/find-short-term-rent-ads-filter.request';
import { ShortTermRentLockedDateDocument } from '@infrastructure/elastic-search/documents/short-term-rent-locked-dates.document';
import { ShortTermRentRentedDateDocument } from '@infrastructure/elastic-search/documents/short-term-rent-rented-dates.document';
import { ShortTermRentDocument, ShortTermRentDocumentProps } from '@infrastructure/elastic-search/documents/short-term-rent.document';
import { SlugModel } from '@infrastructure/models/slug.model';
import { ElasticsearchService } from '@nestjs/elasticsearch';
export declare class FindShortTermRentAdsClusterService {
    private readonly elasticsearchService;
    private readonly shortTermRentDocument;
    private filter;
    constructor(elasticsearchService: ElasticsearchService, shortTermRentDocument: ShortTermRentDocument, shortTermRentLockedDateDocument: ShortTermRentLockedDateDocument, shortTermRentRentedDateDocument: ShortTermRentRentedDateDocument);
    handle({ filter, }: {
        filter: FindShortTermRentAdsFilterRequest;
    }): Promise<[ShortTermRentDocumentProps[], number, SlugModel[]]>;
    private buildQuery;
}
