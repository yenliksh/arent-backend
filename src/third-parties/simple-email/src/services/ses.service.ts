import { Inject, Injectable } from '@nestjs/common';
import * as SES from 'aws-sdk/clients/ses';

import { SESModuleOptions, SIMPLE_EMAIL_OPTIONS_PROVIDER_NAME } from '../simple-email.types';

@Injectable()
export class SESService {
  private _client: SES;
  constructor(
    @Inject(SIMPLE_EMAIL_OPTIONS_PROVIDER_NAME)
    private readonly options: SESModuleOptions,
  ) {
    this._client = this.createS3FromOptions();
  }

  private createS3FromOptions(): SES {
    return new SES({
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
