import { LongTermRentDocument, LongTermRentDocumentProps } from '@infrastructure/elastic-search/documents/long-term-rent.document';
import { SlugModel } from '@infrastructure/models/slug.model';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { FindLongTermRentAdsFilterRequest } from '../../dtos/find-long-term-rent-ads-filter.request';
export declare class FindLongTermRentAdsClusterService {
    private readonly elasticsearchService;
    private readonly longTermRentDocument;
    private filter;
    constructor(elasticsearchService: ElasticsearchService, longTermRentDocument: LongTermRentDocument);
    handle({ filter, }: {
        filter: FindLongTermRentAdsFilterRequest;
    }): Promise<[LongTermRentDocumentProps[], number, SlugModel[]]>;
    private buildQuery;
}
