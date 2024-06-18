import { Queue } from 'bull';
import { CancelInnopayTransactionJobPayload, CompleteCashOutInnopayTransactionJobPayload, HandleCustomerReferenceJobPayload } from './types';
export declare class InnopayTransactionBullsQueue {
    private innopayTransactionQueue;
    constructor(innopayTransactionQueue: Queue);
    private readonly baseParams;
    addHandleCustomerReferenceJob(payload: HandleCustomerReferenceJobPayload): void;
    addCancelInnopayTransactionJob(payload: CancelInnopayTransactionJobPayload): void;
    adCompleteCashOutJob(payload: CompleteCashOutInnopayTransactionJobPayload): void;
}
