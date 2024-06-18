import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Consumer } from 'sqs-consumer';
import { Producer } from 'sqs-producer';
import { Message, QueueName, SqsOptions } from './sqs.types';
import { DiscoveryService } from '@nestjs-plus/discovery';
import * as AWS from 'aws-sdk';
export declare class SqsService implements OnModuleInit, OnModuleDestroy {
    readonly options: SqsOptions;
    private readonly discover;
    readonly consumers: Map<string, Consumer>;
    readonly producers: Map<string, Producer>;
    private readonly logger;
    constructor(options: SqsOptions, discover: DiscoveryService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): void;
    private getQueueInfo;
    purgeQueue(name: QueueName): Promise<{
        $response: AWS.Response<{}, AWS.AWSError>;
    }>;
    getQueueAttributes(name: QueueName): Promise<{
        [x: string]: string;
    }>;
    getProducerQueueSize(name: QueueName): Promise<number>;
    send<T = any>(name: QueueName, payload: Message<T> | Message<T>[]): Promise<AWS.SQS.SendMessageBatchResultEntryList>;
}
