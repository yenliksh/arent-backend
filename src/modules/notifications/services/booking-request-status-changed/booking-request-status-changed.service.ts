import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { slashAgnostic } from '@libs/utils/slash-agnostic';
import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Destination, Message } from 'aws-sdk/clients/ses';
import { Err, Ok, Result } from 'oxide.ts';

import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { BookingRequestStatusChangedEvent } from './booking-request-status-changed.event';
import { bookingRequestStatusChangedTemplate } from './booking-request-status-changed.template';

@Injectable()
export class BookingRequestStatusChangedService extends BaseNotificationRecipients {
  constructor(private readonly simpleEmailService: SimpleEmailService, configService: ConfigService) {
    super(configService);
  }

  async handle({ recipientId }: BookingRequestStatusChangedEvent): Promise<Result<string, HttpException>> {
    const recipient = await UserOrmEntity.query().findById(recipientId.value);

    if (!recipient) {
      return Err(new NotFoundException('Recipent not found!'));
    }

    const filteredEmailRecipients = this.builder(recipient)
      .filterByEmailVerified()
      .filterByEmailParams('adRejected')
      .get();

    await this.sendEmailNotification(filteredEmailRecipients);

    return Ok('OK');
  }

  private async sendEmailNotification(recipients: UserOrmEntity[]) {
    return Promise.all(
      recipients.map((recipient) => {
        const recipientName = `${recipient.firstName} ${recipient.lastName}`;
        const recipientEmail = recipient.email;

        const destination: Destination = {
          ToAddresses: [recipientEmail],
        };

        const message: Message = this.templateMessage(recipientName);

        return this.simpleEmailService.sendEmail({
          source: this.emailFrom,
          destination,
          message,
        });
      }),
    );
  }

  private templateMessage(recipientName: string) {
    const message: Message = {
      Subject: {
        Charset: 'UTF-8',
        Data: '📩 Запрос по бронированию жилья изменен!',
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: bookingRequestStatusChangedTemplate({
            recipientName,
            buttonLink: slashAgnostic(this.frontendUrl, 'chat'),
          }),
        },
      },
    };

    return message;
  }
}
