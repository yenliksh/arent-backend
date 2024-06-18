"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.innopayPaymentFactory = void 0;
const config_1 = require("@nestjs/config");
exports.innopayPaymentFactory = {
    useFactory: (configService) => {
        return {
            realMerchantId: configService.getOrThrow('payment.realMerchantId'),
            virtualMerchantId: configService.getOrThrow('payment.virtualMerchantId'),
            oneClickUrlApi: configService.get('payment.oneClickApiUrl'),
            eComUrlApi: configService.get('payment.eComApiUrl'),
            merchantKeyword: configService.get('payment.merchantKeyword'),
        };
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=innopay-payment.factory.js.map