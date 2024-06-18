import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { JobOptions, Queue } from 'bull';

import { CancelTransactionJobPayload, PaymentBulls, PaymentTransactionProcess, TransactionJobPayload } from '../types';

export enum PaymentJobPriority {
  CANCEL = 1,
  CASH_IN = 2,
  CASH_OUT = 3,
}

@Injectable()
export class PaymentQueue {
  constructor(@InjectQueue(PaymentBulls.PAYMENT_TRANSACTION) private paymentTransactionQueue: Queue) {}

  private readonly baseParams: JobOptions = {
    removeOnFail: true,
    removeOnComplete: true,
  };

  private readonly paramsMapper: { [P in PaymentTransactionProcess]: JobOptions } = {
    [PaymentTransactionProcess.CASH_IN]: { ...this.baseParams, priority: PaymentJobPriority.CASH_IN },
    [PaymentTransactionProcess.CASH_OUT]: { ...this.baseParams, priority: PaymentJobPriority.CASH_OUT },
    [PaymentTransactionProcess.CANCEL]: { ...this.baseParams, priority: PaymentJobPriority.CANCEL },
  };

  addCashInJob(payload: TransactionJobPayload) {
    this.paymentTransactionQueue.add(
      PaymentTransactionProcess.CASH_IN,
      payload,
      this.paramsMapper[PaymentTransactionProcess.CASH_IN],
    );
  }

  addCashOutJob(payload: TransactionJobPayload) {
    this.paymentTransactionQueue.add(
      PaymentTransactionProcess.CASH_OUT,
      payload,
      this.paramsMapper[PaymentTransactionProcess.CASH_OUT],
    );
  }

  addCancelJob(payload: CancelTransactionJobPayload) {
    this.paymentTransactionQueue.add(
      PaymentTransactionProcess.CANCEL,
      payload,
      this.paramsMapper[PaymentTransactionProcess.CANCEL],
    );
  }
}
