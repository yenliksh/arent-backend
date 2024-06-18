import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ID } from '@libs/ddd/domain/value-objects/id.value-object';
import { slashAgnostic } from '@libs/utils/slash-agnostic';
import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Destination, Message } from 'aws-sdk/clients/ses';

import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { VerificationEmailEvent } from './verification-email.event';
import { verificationEmailTemplate } from './verification-email.template';

@Injectable()
export class VerificationEmailService extends BaseNotificationRecipients {
  constructor(private readonly simpleEmailService: SimpleEmailService, configService: ConfigService) {
    super(configService);
  }

  async handle({ recipientId, token }: VerificationEmailEvent) {
    const recipient = await this.getRecipient(recipientId);

    await this.sendEmailNotification(recipient, token);
  }

  private async getRecipient(recipientId: ID): Promise<UserOrmEntity> {
    const recipient = await UserOrmEntity.query().findById(recipientId.value);

    if (!recipient) {
      throw new UnprocessableEntityException('For send emails sender not found');
    }

    return recipient;
  }

  private async sendEmailNotification(recipient: UserOrmEntity, token: string) {
    const recipientName = `${recipient.firstName} ${recipient.lastName}`;

    const destination: Destination = {
      ToAddresses: [recipient.email],
    };

    const message: Message = {
      Subject: {
        Charset: 'UTF-8',
        Data: '✉️ Подтверждение почты',
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: verificationEmailTemplate({
            recipientName,
            buttonLink: slashAgnostic(this.frontendUrl, `my-profile?activeTab=SECURITY&token=${token}`),
          }),
        },
      },
    };

    await this.simpleEmailService.sendEmail({
      source: this.emailFrom,
      destination,
      message,
    });
  }
}
