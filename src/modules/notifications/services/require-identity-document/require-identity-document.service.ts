import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ID } from '@libs/ddd/domain/value-objects/id.value-object';
import { slashAgnostic } from '@libs/utils/slash-agnostic';
import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Destination, Message } from 'aws-sdk/clients/ses';

import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { RequireIdentityDocumentEvent } from './require-identity-document.event';
import { requireIdentityDocumentTemplate } from './require-identity-document.template';

@Injectable()
export class RequireIdentityDocumentService extends BaseNotificationRecipients {
  constructor(private readonly simpleEmailService: SimpleEmailService, configService: ConfigService) {
    super(configService);
  }

  async handle({ recipientId }: RequireIdentityDocumentEvent) {
    const recipient = await this.getRecipient(recipientId);

    await this.sendEmailNotification(recipient);
  }

  private async getRecipient(recipientId: ID): Promise<UserOrmEntity> {
    const recipient = await UserOrmEntity.query().findById(recipientId.value);

    if (!recipient) {
      throw new UnprocessableEntityException('For send emails sender not found');
    }

    return recipient;
  }

  private async sendEmailNotification(recipient: UserOrmEntity) {
    const recipientName = `${recipient.firstName} ${recipient.lastName}`;

    const destination: Destination = {
      ToAddresses: [recipient.email],
    };

    const message: Message = {
      Subject: {
        Charset: 'UTF-8',
        Data: '⬆️ Загрузите удостоверение личности',
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: requireIdentityDocumentTemplate({
            recipientName,
            buttonLink: slashAgnostic(this.frontendUrl, `my-profile?activeTab=SECURITY`),
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
