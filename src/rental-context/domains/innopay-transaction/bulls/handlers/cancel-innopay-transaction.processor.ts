import { ReversingInnopayTransactionRepository } from '@domain-repositories/reversing-innopay-transaction/reversing-innopay-transaction.repository';
import { sleep } from '@libs/utils/sleep';
import { Process, Processor } from '@nestjs/bull';
import { InnopayCashInService } from '@third-parties/innopay-payment/src/services/innopay-cash-in.service';
import { Job } from 'bull';

import { CancelInnopayTransactionProducer } from '../sqs-producers/cancel-innopay-transaction.producer';
import { CancelInnopayTransactionJobPayload, InnopayBulls, InnopayTransactionProcess } from '../types';

@Processor(InnopayBulls.INNOPAY_TRANSACTION)
export class CancelInnopayTransactionProcessor {
  constructor(
    private readonly reversingInnopayTransactionRepository: ReversingInnopayTransactionRepository,
    private readonly sqsProducer: CancelInnopayTransactionProducer,
    private readonly innopayCashInService: InnopayCashInService,
  ) {}

  @Process(InnopayTransactionProcess.CANCEL_INNOPAY_TRANSACTION)
  async handle(job: Job<CancelInnopayTransactionJobPayload>) {
    const { customerReference, iteration = 0 } = job.data;

    try {
      const cancelResult = await this.innopayCashInService.cancelECommTransaction(customerReference);

      if (!cancelResult) {
        throw new Error('Transaction not canceled');
      }

      const reversingInnopayTransaction = await this.reversingInnopayTransactionRepository.findByCustomerReference(
        customerReference,
      );

      if (reversingInnopayTransaction) {
        reversingInnopayTransaction.reverse();

        await this.reversingInnopayTransactionRepository.save(reversingInnopayTransaction);
      }
    } catch (error) {
      this.sqsProducer.send({ customerReference, iteration });
    }

    await sleep(1000);
  }
}
