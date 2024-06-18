import { SQSService } from '@modules/aws/sqs/sqs.service';
import { CompleteCashOutInnopayTransactionsQueueData } from '../types';
export declare class CompleteCashOutInnopayTransactionProducer {
    private readonly sqsService;
    constructor(sqsService: SQSService);
    private readonly queue;
    send(body: CompleteCashOutInnopayTransactionsQueueData): Promise<string | undefined>;
}
