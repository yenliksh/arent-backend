import { InnopayCashOutService } from '@third-parties/innopay-payment/src/services/innopay-cash-out.service';
import { Job } from 'bull';
import { CompleteCashOutInnopayTransactionProducer } from '../sqs-producers/complete-cash-out-innopay-transaction.producer';
import { CompleteCashOutInnopayTransactionJobPayload } from '../types';
export declare class CompleteCashOutProcessor {
    private readonly sqsProducer;
    private readonly innopayCashOutService;
    constructor(sqsProducer: CompleteCashOutInnopayTransactionProducer, innopayCashOutService: InnopayCashOutService);
    handle(job: Job<CompleteCashOutInnopayTransactionJobPayload>): Promise<void>;
}
