import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { BaseOffsetPaginationRequest } from '@infrastructure/dto/base-offset-pagination.request.dto';
import { LongTermRentDocument } from '@infrastructure/elastic-search/documents/long-term-rent.document';
import { OffsetPaginationResult } from '@libs/utils/offset-paginaton-service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { FindLongTermRentAdsFilterRequest } from '../../dtos/find-long-term-rent-ads-filter.request';
export declare class FindLongTermRentAdsService {
    private readonly elasticsearchService;
    private readonly longTermRentDocument;
    private filter;
    constructor(elasticsearchService: ElasticsearchService, longTermRentDocument: LongTermRentDocument);
    handle({ filter, pagination, }: {
        filter: FindLongTermRentAdsFilterRequest;
        pagination: BaseOffsetPaginationRequest;
    }): Promise<OffsetPaginationResult<LongTermRentOrmEntity>>;
    private buildQuery;
}
