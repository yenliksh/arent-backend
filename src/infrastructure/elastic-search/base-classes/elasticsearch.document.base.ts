import { RequestParams } from '@elastic/elasticsearch';
import { Logger } from '@nestjs/common';

import { Mappings } from '../elasticsearch.types';
import { IndicesIndexSettings } from '../types';

export abstract class ElasticsearchDocumentBase<DocumentProps> {
  protected logger: Logger;

  constructor() {
    this.logger = new Logger('ElasticsearchDocumentBase');
  }

  abstract indexName: string;

  abstract getIndicesOptions(): RequestParams.IndicesCreate<Record<string, any>>;

  protected abstract get settings(): IndicesIndexSettings;

  protected abstract get mappingProperties(): Mappings<DocumentProps>;
}
