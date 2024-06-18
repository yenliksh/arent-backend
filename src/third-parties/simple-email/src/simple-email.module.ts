import { DynamicModule, Module, Provider, Type } from '@nestjs/common';

import { SESService, SimpleEmailService } from './services';
import { SESModuleAsyncOptions, SESOptionsFactory, SIMPLE_EMAIL_OPTIONS_PROVIDER_NAME } from './simple-email.types';

@Module({})
export class SimpleEmailModule {
  static forRootAsync(options: SESModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: SimpleEmailModule,
      imports: options.imports,
      providers: [...asyncProviders, SimpleEmailService, SESService],
      exports: [SimpleEmailService, SESService],
    };
  }

  private static createAsyncProviders(options: SESModuleAsyncOptions): Provider[] {
    if (options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<SESOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: SESModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: SIMPLE_EMAIL_OPTIONS_PROVIDER_NAME,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [options.useClass as Type<SESOptionsFactory>];

    return {
      provide: SIMPLE_EMAIL_OPTIONS_PROVIDER_NAME,
      useFactory: async (optionsFactory: SESOptionsFactory) => await optionsFactory.createSESOptions(),
      inject,
    };
  }
}
