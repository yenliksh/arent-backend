import { ModuleMetadata, Type } from '@nestjs/common';
export declare const SMS_CENTER_KZ_OPTIONS_PROVIDER_NAME = "SMS_CENTER_KZ_MODULE_OPTIONS";
export declare type SmsCenterKzModuleOptions = {
    login: string;
    password: string;
    sender: string;
    link: string;
};
export interface SmsCenterKzOptionsFactory {
    createSmsCenterKzOptions(): Promise<SmsCenterKzModuleOptions> | SmsCenterKzModuleOptions;
}
export interface SmsCenterKzModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory?: (...args: any[]) => Promise<SmsCenterKzModuleOptions> | SmsCenterKzModuleOptions;
    useClass?: Type<SmsCenterKzOptionsFactory>;
    inject?: any[];
}
