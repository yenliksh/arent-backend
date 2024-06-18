import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module, Provider, Type } from '@nestjs/common';

import { SmsCenterKzService } from './sms-center-kz.service';
import {
  SMS_CENTER_KZ_OPTIONS_PROVIDER_NAME,
  SmsCenterKzModuleAsyncOptions,
  SmsCenterKzOptionsFactory,
} from './sms-center-kz.types';

@Module({})
export class SmsCenterKzModule {
  static forRootAsync(options: SmsCenterKzModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);
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
      module: SmsCenterKzModule,
      imports: options.imports,
      providers: [...asyncProviders, SmsCenterKzService],
      exports: [SmsCenterKzService],
    };
  }

  private static createAsyncProviders(options: SmsCenterKzModuleAsyncOptions): Provider[] {
    if (options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<SmsCenterKzOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: SmsCenterKzModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: SMS_CENTER_KZ_OPTIONS_PROVIDER_NAME,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [options.useClass as Type<SmsCenterKzOptionsFactory>];

    return {
      provide: SMS_CENTER_KZ_OPTIONS_PROVIDER_NAME,
      useFactory: async (optionsFactory: SmsCenterKzOptionsFactory) => await optionsFactory.createSmsCenterKzOptions(),
      inject,
    };
  }
}
