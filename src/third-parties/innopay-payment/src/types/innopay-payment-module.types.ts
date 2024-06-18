import { ModuleMetadata, Type } from '@nestjs/common';

export const INNOPAY_PAYMENT_OPTIONS_PROVIDER_NAME = 'INNOPAY_PAYMENT_MODULE_OPTIONS';

export declare type InnopayPaymentModuleOptions = {
  realMerchantId: string;
  virtualMerchantId: string;
  oneClickUrlApi?: string;
  eComUrlApi?: string;
  merchantKeyword?: string;
};

export interface InnopayPaymentOptionsFactory {
  createInnopayPaymentOptions(): Promise<InnopayPaymentModuleOptions> | InnopayPaymentModuleOptions;
}

export interface InnopayPaymentModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<InnopayPaymentModuleOptions> | InnopayPaymentModuleOptions;
  useClass?: Type<InnopayPaymentOptionsFactory>;
  inject?: any[];
}
