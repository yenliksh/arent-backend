import { Queue } from 'bull';
import { CancelTransactionJobPayload, TransactionJobPayload } from '../types';
export declare enum PaymentJobPriority {
    CANCEL = 1,
    CASH_IN = 2,
    CASH_OUT = 3
}
export declare class PaymentQueue {
    private paymentTransactionQueue;
    constructor(paymentTransactionQueue: Queue);
    private readonly baseParams;
    private readonly paramsMapper;
    addCashInJob(payload: TransactionJobPayload): void;
    addCashOutJob(payload: TransactionJobPayload): void;
    addCancelJob(payload: CancelTransactionJobPayload): void;
}
