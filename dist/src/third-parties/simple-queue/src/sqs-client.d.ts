import { ConfigService } from '@nestjs/config';
import * as SQS from 'aws-sdk/clients/sqs';
import { SQSModuleOptions } from './simple-queue.types';
export declare class SQSClient {
    private readonly options;
    private readonly configService;
    private _client;
    private isDevelopment;
    constructor(options: SQSModuleOptions, configService: ConfigService);
    private initSQSFromOptions;
    private createDevelopQueues;
    get client(): SQS;
}
