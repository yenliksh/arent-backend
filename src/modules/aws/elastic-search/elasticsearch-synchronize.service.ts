import { ElasticsearchRepositoryBase } from '@infrastructure/elastic-search/base-classes/elasticsearch.repository.base';
import { LongTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/long-term-rent.document-repository';
import { ShortTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ElasticsearchSynchronizeService implements OnModuleInit {
  private logger: Logger;
  private runSeedsOnCreation: boolean;

  private repositoryList: ElasticsearchRepositoryBase<unknown, unknown, unknown>[] = [];

  constructor(
    private readonly longTermRentDocumentRepository: LongTermRentDocumentRepository,
    private readonly shortTermRentDocumentRepository: ShortTermRentDocumentRepository,
    private readonly configService: ConfigService,
  ) {
    this.logger = new Logger('ElasticsearchSynchronizeService');
    this.repositoryList = [this.longTermRentDocumentRepository, this.shortTermRentDocumentRepository];
    this.runSeedsOnCreation = this.configService.get<boolean>('elasticsearch.enableSeedFromDb') as boolean;
  }

  async onModuleInit(): Promise<void> {
    for await (const repository of this.repositoryList) {
      const isIndexAlreadyExists = await repository.isExistIndex();

      if (!isIndexAlreadyExists) {
        this.logger.warn(`Not found index for ${repository.document.indexName}, creating...`);
        await this.createIndex(repository);
      }
    }
  }

  private async createIndex<T, R, B>(repository: ElasticsearchRepositoryBase<T, R, B>): Promise<boolean> {
    try {
      await repository.createIndex();

      if (this.runSeedsOnCreation) {
        await repository.seedIndex();
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
