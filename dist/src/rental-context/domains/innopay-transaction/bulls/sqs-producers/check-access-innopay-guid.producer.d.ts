import { SQSService } from '@modules/aws/sqs/sqs.service';
import { InnopayTransactionsQueueData } from '../types';
export declare class CheckAccessInnopayGuidProducer {
    private readonly sqsService;
    constructor(sqsService: SQSService);
    private readonly queue;
    send(body: InnopayTransactionsQueueData): Promise<string | undefined>;
}
