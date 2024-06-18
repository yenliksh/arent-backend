import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { slashAgnostic } from '@libs/utils/slash-agnostic';
import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Destination, Message } from 'aws-sdk/clients/ses';

import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { BookingRequestSentEvent } from '../booking-request-sent/booking-request-sent.event';
import { apartmentAdRejectedTemplate } from './apartment-ad-rejected.template';

@Injectable()
export class ApartmentAdRejectService extends BaseNotificationRecipients {
  constructor(private readonly simpleEmailService: SimpleEmailService, configService: ConfigService) {
    super(configService);
  }

  async handle({ recipientId }: BookingRequestSentEvent) {
    const recipient = await UserOrmEntity.query().findById(recipientId.value);

    if (!recipient) {
      return;
    }

    const filteredEmailRecipients = this.builder(recipient)
      .filterByEmailVerified()
      .filterByEmailParams('adRejected')
      .get();

    await this.sendEmailNotification(filteredEmailRecipients);
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
        Data: '📢 Ваше объявление не опубликовано',
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: apartmentAdRejectedTemplate({
            recipientName,
            buttonLink: slashAgnostic(this.frontendUrl, 'dashboard?activeTab=ADS'),
          }),
        },
      },
    };

    return message;
  }
}
