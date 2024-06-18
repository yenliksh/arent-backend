import { ReversingInnopayTransactionRepository } from '@domain-repositories/reversing-innopay-transaction/reversing-innopay-transaction.repository';
import { InnopayCashInService } from '@third-parties/innopay-payment/src/services/innopay-cash-in.service';
import { Job } from 'bull';
import { CancelInnopayTransactionProducer } from '../sqs-producers/cancel-innopay-transaction.producer';
import { CancelInnopayTransactionJobPayload } from '../types';
export declare class CancelInnopayTransactionProcessor {
    private readonly reversingInnopayTransactionRepository;
    private readonly sqsProducer;
    private readonly innopayCashInService;
    constructor(reversingInnopayTransactionRepository: ReversingInnopayTransactionRepository, sqsProducer: CancelInnopayTransactionProducer, innopayCashInService: InnopayCashInService);
    handle(job: Job<CancelInnopayTransactionJobPayload>): Promise<void>;
}
