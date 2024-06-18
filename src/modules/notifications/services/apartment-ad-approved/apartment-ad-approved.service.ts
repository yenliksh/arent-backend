import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { slashAgnostic } from '@libs/utils/slash-agnostic';
import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Destination, Message } from 'aws-sdk/clients/ses';

import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { ApartmentAdApprovedEvent } from './apartment-ad-approved.event';
import { apartmentAdApprovedTemplate } from './apartment-ad-approved.template';

@Injectable()
export class ApartmentAdApprovedService extends BaseNotificationRecipients {
  constructor(private readonly simpleEmailService: SimpleEmailService, configService: ConfigService) {
    super(configService);
  }

  async handle({ recipientId }: ApartmentAdApprovedEvent) {
    const recipient = await UserOrmEntity.query().findById(recipientId.value);

    if (!recipient) {
      return;
    }

    const filteredEmailRecipients = this.builder(recipient)
      .filterByEmailVerified()
      .filterByEmailParams('adApproved')
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
        Data: '✅ Объявление проверено',
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: apartmentAdApprovedTemplate({
            recipientName,
            buttonLink: slashAgnostic(this.frontendUrl, 'dashboard?activeTab=ADS'),
          }),
        },
      },
    };

    return message;
  }
}
