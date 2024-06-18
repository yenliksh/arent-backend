import { ClientOptions } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchOptionsFactory } from '@nestjs/elasticsearch';
import * as AWS from 'aws-sdk';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const createAwsElasticsearchConnector = require('aws-elasticsearch-connector');

@Injectable()
export class ElasticsearchConfigService implements ElasticsearchOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  async createElasticsearchOptions(): Promise<ClientOptions> {
    const awsConfig = new AWS.Config({
      accessKeyId: this.configService.get<string>('elasticsearch.accessKey') as string,
      secretAccessKey: this.configService.get<string>('elasticsearch.secretAccessKey') as string,
      region: this.configService.get<string>('elasticsearch.region') as string,
    });

    return {
      ...createAwsElasticsearchConnector(awsConfig),
      node: this.configService.get<string>('elasticsearch.node'),
    };
  }
}
