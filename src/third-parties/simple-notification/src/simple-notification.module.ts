import { DynamicModule, Module, Provider, Type } from '@nestjs/common';

import { SNSService, SimpleNotificationService } from './services';
import {
  SIMPLE_NOTIFICATION_OPTIONS_PROVIDER_NAME,
  SNSModuleAsyncOptions,
  SNSOptionsFactory,
} from './simple-notification.types';

@Module({})
export class SimpleNotificationModule {
  static forRootAsync(options: SNSModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: SimpleNotificationModule,
      imports: options.imports,
      providers: [...asyncProviders, SimpleNotificationService, SNSService],
      exports: [SimpleNotificationService, SNSService],
    };
  }

  private static createAsyncProviders(options: SNSModuleAsyncOptions): Provider[] {
    if (options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<SNSOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: SNSModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: SIMPLE_NOTIFICATION_OPTIONS_PROVIDER_NAME,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [options.useClass as Type<SNSOptionsFactory>];

    return {
      provide: SIMPLE_NOTIFICATION_OPTIONS_PROVIDER_NAME,
      useFactory: async (optionsFactory: SNSOptionsFactory) => await optionsFactory.createSNSOptions(),
      inject,
    };
  }
}
