import { ArgumentInvalidException } from '@libs/exceptions';
import { SQSQueues } from '@modules/aws/sqs/constants';
import { Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';

import { InnopayTransactionBullsQueue } from '../../bulls/innopay-transaction-bulls.queue';
import { CompleteCashOutInnopayTransactionsQueueData } from '../../bulls/types';

@Injectable()
export class CompleteCashOutInnopayTransactionConsumer {
  constructor(private readonly innopayTransactionBullsQueue: InnopayTransactionBullsQueue) {}

  @SqsMessageHandler(SQSQueues.completeCashOutInnopayTransactionQueue.name, false)
  async handle(queueMessage: AWS.SQS.Message) {
    const isSqsMessageTypeValid = <T>(
      obj: CompleteCashOutInnopayTransactionsQueueData | T,
    ): obj is CompleteCashOutInnopayTransactionsQueueData => {
      return (
        (obj as CompleteCashOutInnopayTransactionsQueueData)?.customerReference !== undefined &&
        (obj as CompleteCashOutInnopayTransactionsQueueData)?.success !== undefined
      );
    };

    const body = queueMessage.Body ? JSON.parse(queueMessage.Body) : undefined;

    if (!isSqsMessageTypeValid(body)) {
      Sentry.captureException(`Invalid sqs message type for cancel innopay transaction. Body: ${body}`);
      throw new ArgumentInvalidException(`Invalid sqs message type for cancel innopay transaction`);
    }

    this.innopayTransactionBullsQueue.adCompleteCashOutJob(body);
  }
}
