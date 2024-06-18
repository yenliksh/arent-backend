import { ArgumentInvalidException } from '@libs/exceptions';
import { SQSQueues } from '@modules/aws/sqs/constants';
import { Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';

import { InnopayTransactionBullsQueue } from '../../bulls/innopay-transaction-bulls.queue';
import { InnopayTransactionsQueueData } from '../../bulls/types';

@Injectable()
export class StuckedInnopayGuidStatusConsumer {
  constructor(private readonly innopayTransactionBullsQueue: InnopayTransactionBullsQueue) {}

  @SqsMessageHandler(SQSQueues.stuckedInnopayGuidStatusQueue.name, false)
  async handle(queueMessage: AWS.SQS.Message) {
    const isSqsMessageTypeValid = <T>(obj: InnopayTransactionsQueueData | T): obj is InnopayTransactionsQueueData => {
      return (obj as InnopayTransactionsQueueData)?.customerReference !== undefined;
    };

    const body = queueMessage.Body ? JSON.parse(queueMessage.Body) : undefined;

    if (!isSqsMessageTypeValid(body)) {
      Sentry.captureException(`Invalid sqs message type for check stucked innopay guid status. Body: ${body}`);
      throw new ArgumentInvalidException(`Invalid sqs message type for check stucked innopay guid status`);
    }

    this.innopayTransactionBullsQueue.addHandleCustomerReferenceJob(body);
  }
}
