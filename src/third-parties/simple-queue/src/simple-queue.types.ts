import { ModuleMetadata, Type } from '@nestjs/common';

export const SIMPLE_QUEUE_OPTIONS_PROVIDER_NAME = 'SQS_MODULE_OPTIONS';

export declare type SQSModuleOptions = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  queuesNames?: string[];
  endpoint?: string;
};

export interface SQSOptionsFactory {
  createSQSOptions(): Promise<SQSModuleOptions> | SQSModuleOptions;
}

export interface SQSModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<SQSModuleOptions> | SQSModuleOptions;
  useClass?: Type<SQSOptionsFactory>;
  inject?: any[];
}
