import { HttpService } from '@nestjs/axios';
import { InnopayServiceType } from '../../types/enums';
import { InnopayPaymentModuleOptions } from '../../types/innopay-payment-module.types';
export declare class InnopayBaseSdkService {
    private readonly httpService;
    private readonly options;
    private readonly urls;
    constructor(httpService: HttpService, options: InnopayPaymentModuleOptions);
    innopayRequest(serviceType: InnopayServiceType, body: any): Promise<import("axios").AxiosResponse<any, any>>;
    get realMerchantId(): string;
    get virtualMerchantId(): string;
    get merchantKeyword(): string;
    private validatedMerchantId;
}
