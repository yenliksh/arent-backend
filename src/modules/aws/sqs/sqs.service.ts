import { Injectable } from '@nestjs/common';
import { SQSClient } from '@third-parties/simple-queue/src';

import { SQSSendMessage } from './sqs.types';

@Injectable()
export class SQSService {
  constructor(private readonly sqsClient: SQSClient) {}

  async sendMessage(params: SQSSendMessage) {
    const { body, queueUrl } = params;

    const result = await this.sqsClient.client
      .sendMessage({ MessageBody: JSON.stringify(body), QueueUrl: queueUrl, MessageGroupId: 'default' })
      .promise();

    return result.MessageId;
  }

  async deleteMessage(params: { receiptHandle: string; queueUrl: string }) {
    const { queueUrl, receiptHandle } = params;
    const result = await this.sqsClient.client
      .deleteMessage({ QueueUrl: queueUrl, ReceiptHandle: receiptHandle })
      .promise();

    return result;
  }
}
