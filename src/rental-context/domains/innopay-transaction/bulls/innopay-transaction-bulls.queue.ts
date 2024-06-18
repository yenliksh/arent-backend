import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { JobOptions, Queue } from 'bull';

import {
  CancelInnopayTransactionJobPayload,
  CompleteCashOutInnopayTransactionJobPayload,
  HandleCustomerReferenceJobPayload,
  InnopayBulls,
  InnopayTransactionProcess,
} from './types';

@Injectable()
export class InnopayTransactionBullsQueue {
  constructor(@InjectQueue(InnopayBulls.INNOPAY_TRANSACTION) private innopayTransactionQueue: Queue) {}

  private readonly baseParams: JobOptions = {
    removeOnFail: true,
    removeOnComplete: true,
  };

  addHandleCustomerReferenceJob(payload: HandleCustomerReferenceJobPayload) {
    this.innopayTransactionQueue.add(InnopayTransactionProcess.HANDLE_CUSTOMER_REFERENCE, payload, this.baseParams);
  }

  addCancelInnopayTransactionJob(payload: CancelInnopayTransactionJobPayload) {
    this.innopayTransactionQueue.add(InnopayTransactionProcess.CANCEL_INNOPAY_TRANSACTION, payload, this.baseParams);
  }

  adCompleteCashOutJob(payload: CompleteCashOutInnopayTransactionJobPayload) {
    this.innopayTransactionQueue.add(InnopayTransactionProcess.COMPLETE_CASH_OUT, payload, this.baseParams);
  }
}
