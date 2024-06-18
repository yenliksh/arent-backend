import { ModuleMetadata, Type } from '@nestjs/common';

export const SIMPLE_NOTIFICATION_OPTIONS_PROVIDER_NAME = 'SNS_MODULE_OPTIONS';

export declare type SNSModuleOptions = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  endpoint?: string;
};

export interface SNSOptionsFactory {
  createSNSOptions(): Promise<SNSModuleOptions> | SNSModuleOptions;
}

export interface SNSModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<SNSModuleOptions> | SNSModuleOptions;
  useClass?: Type<SNSOptionsFactory>;
  inject?: any[];
}
