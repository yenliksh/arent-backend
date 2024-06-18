import { ArgumentNotProvidedException } from '@libs/exceptions';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { InnopayServiceType } from '../../types/enums';
import {
  INNOPAY_PAYMENT_OPTIONS_PROVIDER_NAME,
  InnopayPaymentModuleOptions,
} from '../../types/innopay-payment-module.types';

@Injectable()
export class InnopayBaseSdkService {
  private readonly urls: { [P in InnopayServiceType]: () => string } = {
    [InnopayServiceType.ONE_CLICK]: () => {
      const url = this.options.oneClickUrlApi;
      if (!url) {
        throw new ArgumentNotProvidedException('One Click url api required');
      }

      return url;
    },
    [InnopayServiceType.E_COM]: () => {
      const url = this.options.eComUrlApi;
      if (!url) {
        throw new ArgumentNotProvidedException('E-commerce url api required');
      }

      return url;
    },
  };

  constructor(
    private readonly httpService: HttpService,
    @Inject(INNOPAY_PAYMENT_OPTIONS_PROVIDER_NAME)
    private readonly options: InnopayPaymentModuleOptions,
  ) {}

  async innopayRequest(serviceType: InnopayServiceType, body: any) {
    const url = this.urls[serviceType]();

    try {
      const res = await this.httpService
        .post(url, body, {
          headers: {
            'Content-Type': 'text/plain',
          },
        })
        .toPromise();
      if (!res) {
        throw new Error(`Fetch to ${url} return null`);
      }

      return res;
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }
  }

  public get realMerchantId() {
    const merchantId = this.options.realMerchantId;

    return this.validatedMerchantId(merchantId);
  }

  public get virtualMerchantId() {
    const merchantId = this.options.virtualMerchantId;

    return this.validatedMerchantId(merchantId);
  }

  public get merchantKeyword(): string {
    const merchantKeyword = this.options.merchantKeyword;

    if (!merchantKeyword) {
      throw new ArgumentNotProvidedException('MerchantKeyword required');
    }

    return merchantKeyword;
  }

  private validatedMerchantId(value?: string): string {
    if (!value) {
      throw new ArgumentNotProvidedException('MerchantId required');
    }
    if (value.length !== 15) {
      throw new ArgumentNotProvidedException(`MerchantId length must be 15`);
    }

    return value;
  }
}
