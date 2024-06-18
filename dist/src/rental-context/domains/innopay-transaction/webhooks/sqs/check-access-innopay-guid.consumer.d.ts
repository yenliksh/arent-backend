import { InnopayTransactionBullsQueue } from '../../bulls/innopay-transaction-bulls.queue';
export declare class CheckAccessInnopayGuidConsumer {
    private readonly innopayTransactionBullsQueue;
    constructor(innopayTransactionBullsQueue: InnopayTransactionBullsQueue);
    handle(queueMessage: AWS.SQS.Message): Promise<void>;
}
