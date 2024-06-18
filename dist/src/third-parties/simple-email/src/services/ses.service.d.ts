import * as SES from 'aws-sdk/clients/ses';
import { SESModuleOptions } from '../simple-email.types';
export declare class SESService {
    private readonly options;
    private _client;
    constructor(options: SESModuleOptions);
    private createS3FromOptions;
    get client(): SES;
}
