import { Injectable } from '@nestjs/common';
import { Destination, Message, RawMessage } from 'aws-sdk/clients/ses';

import { SESService } from './ses.service';

@Injectable()
export class SimpleEmailService {
  constructor(private readonly sesService: SESService) {}

  public async sendEmail({
    source,
    destination,
    message,
  }: {
    source: string;
    destination: Destination;
    message: Message;
  }) {
    const result = await this.sesService.client
      .sendEmail({ Source: source, Destination: destination, Message: message })
      .promise();

    return result;
  }

  public async sendRawEmail({ rawMessage }: { rawMessage: RawMessage }) {
    const result = await this.sesService.client.sendRawEmail({ RawMessage: rawMessage }).promise();

    return result;
  }
}
