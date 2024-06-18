import { Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { ElasticsearchDocumentMapperBase } from './elasticsearch-document.mapper.base';
import { ElasticsearchDocumentBase } from './elasticsearch.document.base';

export abstract class ElasticsearchRepositoryBase<DocumentProps, OrmEntity, DomainEntity> {
  protected logger: Logger;

  protected constructor(
    protected readonly client: ElasticsearchService,
    protected readonly mapper: ElasticsearchDocumentMapperBase<DocumentProps, OrmEntity, DomainEntity>,
    public readonly document: ElasticsearchDocumentBase<DocumentProps>,
  ) {
    this.logger = new Logger('ElasticsearchRepositoryBase');
  }

  abstract seedIndex(): Promise<boolean>;
  abstract isExistIndex(): Promise<boolean>;
  abstract createIndex(): Promise<boolean>;
}
