import { Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ElasticsearchDocumentMapperBase } from './elasticsearch-document.mapper.base';
import { ElasticsearchDocumentBase } from './elasticsearch.document.base';
export declare abstract class ElasticsearchRepositoryBase<DocumentProps, OrmEntity, DomainEntity> {
    protected readonly client: ElasticsearchService;
    protected readonly mapper: ElasticsearchDocumentMapperBase<DocumentProps, OrmEntity, DomainEntity>;
    readonly document: ElasticsearchDocumentBase<DocumentProps>;
    protected logger: Logger;
    protected constructor(client: ElasticsearchService, mapper: ElasticsearchDocumentMapperBase<DocumentProps, OrmEntity, DomainEntity>, document: ElasticsearchDocumentBase<DocumentProps>);
    abstract seedIndex(): Promise<boolean>;
    abstract isExistIndex(): Promise<boolean>;
    abstract createIndex(): Promise<boolean>;
}
