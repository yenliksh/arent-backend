import { SQSQueues } from '@modules/aws/sqs/constants';
import { SQSService } from '@modules/aws/sqs/sqs.service';
import { Injectable } from '@nestjs/common';

import { InnopayTransactionsQueueData } from '../types';

@Injectable()
export class CheckAccessInnopayGuidProducer {
  constructor(private readonly sqsService: SQSService) {}

  private readonly queue = SQSQueues.checkAccessInnopayGuidQueue;

  async send(body: InnopayTransactionsQueueData): Promise<string | undefined> {
    const iteration = (body.iteration ?? 0) + 1;

    return this.sqsService.sendMessage({
      body: { ...body, iteration },
      queueUrl: this.queue.url,
    });
  }
}
