import { SQSClient } from '@third-parties/simple-queue/src';
import { SQSSendMessage } from './sqs.types';
export declare class SQSService {
    private readonly sqsClient;
    constructor(sqsClient: SQSClient);
    sendMessage(params: SQSSendMessage): Promise<string | undefined>;
    deleteMessage(params: {
        receiptHandle: string;
        queueUrl: string;
    }): Promise<{
        $response: import("aws-sdk").Response<{}, import("aws-sdk").AWSError>;
    }>;
}
