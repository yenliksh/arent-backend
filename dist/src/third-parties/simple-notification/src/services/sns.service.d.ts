import * as SNS from 'aws-sdk/clients/sns';
import { SNSModuleOptions } from '../simple-notification.types';
export declare class SNSService {
    private readonly options;
    private _client;
    constructor(options: SNSModuleOptions);
    private createS3FromOptions;
    get client(): SNS;
}
