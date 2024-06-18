import { DynamicModule, Module, Provider, Type } from '@nestjs/common';

import { SIMPLE_QUEUE_OPTIONS_PROVIDER_NAME, SQSModuleAsyncOptions, SQSOptionsFactory } from './simple-queue.types';
import { SQSClient } from './sqs-client';

@Module({})
export class SimpleQueueModule {
  static forRootAsync(options: SQSModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: SimpleQueueModule,
      imports: options.imports,
      providers: [...asyncProviders, SQSClient],
      exports: [SQSClient],
    };
  }

  private static createAsyncProviders(options: SQSModuleAsyncOptions): Provider[] {
    if (options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<SQSOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: SQSModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: SIMPLE_QUEUE_OPTIONS_PROVIDER_NAME,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [options.useClass as Type<SQSOptionsFactory>];

    return {
      provide: SIMPLE_QUEUE_OPTIONS_PROVIDER_NAME,
      useFactory: async (optionsFactory: SQSOptionsFactory) => await optionsFactory.createSQSOptions(),
      inject,
    };
  }
}
