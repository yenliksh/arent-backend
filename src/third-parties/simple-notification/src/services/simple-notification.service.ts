import { Injectable } from '@nestjs/common';

import { SNSService } from './sns.service';

@Injectable()
export class SimpleNotificationService {
  constructor(private readonly snsService: SNSService) {}

  public async publish({ phoneNumber, message }: { phoneNumber: string; message: string }) {
    const result = await this.snsService.client.publish({ PhoneNumber: phoneNumber, Message: message }).promise();

    return result;
  }
}
