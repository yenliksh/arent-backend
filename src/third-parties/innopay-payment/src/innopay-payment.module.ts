import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module, Provider, Type } from '@nestjs/common';

import { InnopaySoapReader } from './sdk/innopay-soap/innopay-soap.reader';
import { InnopaySoapWriter } from './sdk/innopay-soap/innopay-soap.writer';
import { InnopayBaseSdkService } from './sdk/services/innopay-base-sdk.service';
import { InnopayCardSdkService } from './sdk/services/innopay-card-sdk.service';
import { InnopayCashInSdkService } from './sdk/services/innopay-cash-in-sdk.service';
import { InnopayCashOutSdkService } from './sdk/services/innopay-cash-out-sdk.service';
import { InnopayStatusSdkService } from './sdk/services/innopay-status-sdk.service';
import { InnopayCardService } from './services/innopay-card.service';
import { InnopayCashInService } from './services/innopay-cash-in.service';
import { InnopayCashOutService } from './services/innopay-cash-out.service';
import { InnopayStatusService } from './services/innopay-status.service';
import {
  INNOPAY_PAYMENT_OPTIONS_PROVIDER_NAME,
  InnopayPaymentModuleAsyncOptions,
  InnopayPaymentOptionsFactory,
} from './types/innopay-payment-module.types';

@Module({})
export class InnopayPaymentModule {
  static forRootAsync(options: InnopayPaymentModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);

    const sdkProviders = [
      InnopaySoapWriter,
      InnopaySoapReader,
      InnopayBaseSdkService,
      InnopayCardSdkService,
      InnopayCashInSdkService,
      InnopayCashOutSdkService,
      InnopayStatusSdkService,
    ];

    const serviceProviders = [InnopayCardService, InnopayCashInService, InnopayCashOutService, InnopayStatusService];

    options.imports = options.imports
      ? [
          ...options.imports,
          HttpModule.register({
            maxRedirects: 5,
          }),
        ]
      : [
          HttpModule.register({
            maxRedirects: 5,
          }),
        ];
    return {
      module: InnopayPaymentModule,
      imports: options.imports,
      providers: [...asyncProviders, ...sdkProviders, ...serviceProviders],
      exports: serviceProviders,
    };
  }

  private static createAsyncProviders(options: InnopayPaymentModuleAsyncOptions): Provider[] {
    if (options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<InnopayPaymentOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: InnopayPaymentModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: INNOPAY_PAYMENT_OPTIONS_PROVIDER_NAME,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [options.useClass as Type<InnopayPaymentOptionsFactory>];

    return {
      provide: INNOPAY_PAYMENT_OPTIONS_PROVIDER_NAME,
      useFactory: async (optionsFactory: InnopayPaymentOptionsFactory) => {
        const options = await optionsFactory.createInnopayPaymentOptions();
        return options;
      },
      inject,
    };
  }
}
