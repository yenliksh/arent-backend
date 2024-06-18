import { ConfigService } from '@nestjs/config';
import { InnopayPaymentModuleOptions } from '@third-parties/innopay-payment/src/types/innopay-payment-module.types';

export const innopayPaymentFactory = {
  useFactory: (configService: ConfigService): InnopayPaymentModuleOptions => {
    return {
      realMerchantId: configService.getOrThrow<string>('payment.realMerchantId'),
      virtualMerchantId: configService.getOrThrow<string>('payment.virtualMerchantId'),
      oneClickUrlApi: configService.get<string>('payment.oneClickApiUrl'),
      eComUrlApi: configService.get<string>('payment.eComApiUrl'),
      merchantKeyword: configService.get<string>('payment.merchantKeyword'),
    };
  },
  inject: [ConfigService],
};
