import { Inject, Injectable } from '@nestjs/common';
import * as SNS from 'aws-sdk/clients/sns';

import { SIMPLE_NOTIFICATION_OPTIONS_PROVIDER_NAME, SNSModuleOptions } from '../simple-notification.types';

@Injectable()
export class SNSService {
  private _client: SNS;
  constructor(
    @Inject(SIMPLE_NOTIFICATION_OPTIONS_PROVIDER_NAME)
    private readonly options: SNSModuleOptions,
  ) {
    this._client = this.createS3FromOptions();
  }

  private createS3FromOptions(): SNS {
    return new SNS({
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

  get client() {
    return this._client;
  }
}
