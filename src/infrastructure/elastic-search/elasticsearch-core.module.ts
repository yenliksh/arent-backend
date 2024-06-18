import { FactoryProvider, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';
import * as AWS from 'aws-sdk';

import { LongTermRentDocument } from './documents/long-term-rent.document';
import { ShortTermRentLockedDateDocument } from './documents/short-term-rent-locked-dates.document';
import { ShortTermRentRentedDateDocument } from './documents/short-term-rent-rented-dates.document';
import { ShortTermRentDocument } from './documents/short-term-rent.document';
import { LongTermRentDocumentRepository } from './repositories/long-term-rent.document-repository';
import { ShortTermRentDocumentRepository } from './repositories/short-term-rent.document-repository';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const createAwsElasticsearchConnector = require('aws-elasticsearch-connector');

export const elasticsearchDocuments = [
  LongTermRentDocument,
  ShortTermRentDocument,
  ShortTermRentLockedDateDocument,
  ShortTermRentRentedDateDocument,
];

export const elasticsearchCoreProvider = {
  provide: 'ElasticsearchCoreService',
  inject: [ElasticsearchService],
  useFactory(elasticsearchService: ElasticsearchService) {
    return elasticsearchService;
  },
} as FactoryProvider<ElasticsearchService>;

export const elasticsearchDocumentRepositories = [
  {
    provide: LongTermRentDocumentRepository,
    useFactory: (client: ElasticsearchService) => {
      return new LongTermRentDocumentRepository(client);
    },
    inject: [elasticsearchCoreProvider.provide],
  },
  {
    provide: ShortTermRentDocumentRepository,
    useFactory: (client: ElasticsearchService) => {
      return new ShortTermRentDocumentRepository(client);
    },
    inject: [elasticsearchCoreProvider.provide],
  },
];

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const awsConfig = new AWS.Config({
          accessKeyId: configService.get<string>('elasticsearch.accessKey') as string,
          secretAccessKey: configService.get<string>('elasticsearch.secretAccessKey') as string,
          region: configService.get<string>('elasticsearch.region') as string,
        });

        return {
          ...createAwsElasticsearchConnector(awsConfig),
          node: configService.get<string>('elasticsearch.node') as string,
        };
      },
    }),
  ],
  providers: [elasticsearchCoreProvider, ...elasticsearchDocuments, ...elasticsearchDocumentRepositories],
  exports: [elasticsearchCoreProvider.provide, ...elasticsearchDocuments, ...elasticsearchDocumentRepositories],
})
export class ElasticsearchCoreModule {}
