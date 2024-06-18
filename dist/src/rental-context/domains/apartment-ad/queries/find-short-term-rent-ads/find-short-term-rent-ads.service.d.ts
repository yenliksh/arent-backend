import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { BaseOffsetPaginationRequest } from '@infrastructure/dto/base-offset-pagination.request.dto';
import { ShortTermRentLockedDateDocument } from '@infrastructure/elastic-search/documents/short-term-rent-locked-dates.document';
import { ShortTermRentRentedDateDocument } from '@infrastructure/elastic-search/documents/short-term-rent-rented-dates.document';
import { ShortTermRentDocument } from '@infrastructure/elastic-search/documents/short-term-rent.document';
import { OffsetPaginationResult } from '@libs/utils/offset-paginaton-service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { FindShortTermRentAdsFilterRequest } from '../../dtos/find-short-term-rent-ads-filter.request';
export declare class FindShortTermRentAdsService {
    private readonly elasticsearchService;
    private readonly shortTermRentDocument;
    private filter;
    constructor(elasticsearchService: ElasticsearchService, shortTermRentDocument: ShortTermRentDocument, shortTermRentLockedDateDocument: ShortTermRentLockedDateDocument, shortTermRentRentedDateDocument: ShortTermRentRentedDateDocument);
    handle({ filter, pagination, }: {
        filter: FindShortTermRentAdsFilterRequest;
        pagination: BaseOffsetPaginationRequest;
    }): Promise<OffsetPaginationResult<ShortTermRentOrmEntity>>;
    private buildQuery;
}
