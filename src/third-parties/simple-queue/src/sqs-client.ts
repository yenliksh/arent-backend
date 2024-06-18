import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SQS from 'aws-sdk/clients/sqs';

import { SIMPLE_QUEUE_OPTIONS_PROVIDER_NAME, SQSModuleOptions } from './simple-queue.types';

@Injectable()
export class SQSClient {
  private _client: SQS;
  private isDevelopment: boolean;

  constructor(
    @Inject(SIMPLE_QUEUE_OPTIONS_PROVIDER_NAME)
    private readonly options: SQSModuleOptions,
    private readonly configService: ConfigService,
  ) {
    this._client = this.initSQSFromOptions();
    this.isDevelopment = this.configService.get<string>('nodeEnv') === 'development';
    this.createDevelopQueues();
  }

  private initSQSFromOptions(): SQS {
    return new SQS({
      useAccelerateEndpoint: true,
      signatureVersion: 'v4',
      region: this.options.region,
      credentials: {
        accessKeyId: this.options.accessKeyId,
        secretAccessKey: this.options.secretAccessKey,
      },
      endpoint: this.options.endpoint,
    });
  }

  private createDevelopQueues() {
    if (!this.isDevelopment) {
      return;
    }

    // this.options.queuesNames?.forEach((queueName) => this._client.createQueue({ QueueName: queueName }).promise());
  }

  get client() {
    return this._client;
  }
}
