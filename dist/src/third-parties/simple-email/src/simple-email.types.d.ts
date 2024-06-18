import { ModuleMetadata, Type } from '@nestjs/common';
export declare const SIMPLE_EMAIL_OPTIONS_PROVIDER_NAME = "SES_MODULE_OPTIONS";
export declare type SESModuleOptions = {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    endpoint?: string;
};
export interface SESOptionsFactory {
    createSESOptions(): Promise<SESModuleOptions> | SESModuleOptions;
}
export interface SESModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory?: (...args: any[]) => Promise<SESModuleOptions> | SESModuleOptions;
    useClass?: Type<SESOptionsFactory>;
    inject?: any[];
}
