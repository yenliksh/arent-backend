import { sleep } from '@libs/utils/sleep';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { InnopayCashOutService } from '@third-parties/innopay-payment/src/services/innopay-cash-out.service';
import { InnopayCashOutFinalStatus } from '@third-parties/innopay-payment/src/types/constants';
import { Job } from 'bull';

import { CompleteCashOutInnopayTransactionProducer } from '../sqs-producers/complete-cash-out-innopay-transaction.producer';
import { CompleteCashOutInnopayTransactionJobPayload, InnopayBulls, InnopayTransactionProcess } from '../types';

@Processor(InnopayBulls.INNOPAY_TRANSACTION)
export class CompleteCashOutProcessor {
  constructor(
    private readonly sqsProducer: CompleteCashOutInnopayTransactionProducer,
    private readonly innopayCashOutService: InnopayCashOutService,
  ) {}

  @Process(InnopayTransactionProcess.COMPLETE_CASH_OUT)
  async handle(job: Job<CompleteCashOutInnopayTransactionJobPayload>) {
    const { customerReference, success, iteration = 0 } = job.data;

    try {
      const completeResult = await this.innopayCashOutService.endCashOut(customerReference, success);

      if (!completeResult.success) {
        if (completeResult.status && InnopayCashOutFinalStatus.includes(completeResult.status)) {
          const errorMessage = `Customer reference ${completeResult.customerReference} already has final status ${completeResult.status}`;

          Logger.error(errorMessage);
          Sentry.captureException(errorMessage);

          await sleep(1000);
          return;
        }

        throw new Error('Cash out transaction not completed');
      }
    } catch (error) {
      this.sqsProducer.send({ customerReference, success, iteration });
    }

    await sleep(1000);
  }
}
