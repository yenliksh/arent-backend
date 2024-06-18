import { HttpService } from '@nestjs/axios';
import { SmsCenterKzModuleOptions } from './sms-center-kz.types';
export declare class SmsCenterKzService {
    private readonly options;
    private readonly httpService;
    private charset;
    constructor(options: SmsCenterKzModuleOptions, httpService: HttpService);
    sendSms({ phones, message }: {
        phones: string[];
        message: string;
    }): Promise<void>;
    private urlLinkWithParams;
}
