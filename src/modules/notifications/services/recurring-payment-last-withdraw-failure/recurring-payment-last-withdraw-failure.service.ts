import { ChatOrmEntity } from '@infrastructure/database/entities/chat.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { slashAgnostic } from '@libs/utils/slash-agnostic';
import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Destination, Message } from 'aws-sdk/clients/ses';

import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { RecurringPaymentLastWithdrawFailureEvent } from './recurring-payment-last-withdraw-failure.event';
import { recurringPaymentLastWithdrawFailureTemplate } from './recurring-payment-last-withdraw-failure.template';

@Injectable()
export class RecurringPaymentLastWithdrawFailureService extends BaseNotificationRecipients {
  constructor(private readonly simpleEmailService: SimpleEmailService, configService: ConfigService) {
    super(configService);
  }

  async handle({ recipientId, contractId }: RecurringPaymentLastWithdrawFailureEvent) {
    const [recipient, chat] = await Promise.all([
      UserOrmEntity.query().findById(recipientId.value),
      ChatOrmEntity.query().findOne({ contractId: contractId.value }).select('id'),
    ]);

    if (!recipient || !chat) {
      return;
    }

    const filteredEmailRecipients = this.builder(recipient)
      .filterByEmailVerified()
      .filterByEmailParams('recurringPaymentSuccess')
      .get();

    await this.sendEmailNotification({ recipients: filteredEmailRecipients, chatId: chat.id });
  }

  private async sendEmailNotification({ recipients, chatId }: { recipients: UserOrmEntity[]; chatId: string }) {
    return Promise.all(
      recipients.map((recipient) => {
        const recipientName = `${recipient.firstName} ${recipient.lastName}`;
        const recipientEmail = recipient.email;

        const destination: Destination = {
          ToAddresses: [recipientEmail],
        };

        const message: Message = this.templateMessage(recipientName, chatId);

        return this.simpleEmailService.sendEmail({
          source: this.emailFrom,
          destination,
          message,
        });
      }),
    );
  }

  private templateMessage(recipientName: string, chatId: string) {
    const message: Message = {
      Subject: {
        Charset: 'UTF-8',
        Data: '❌ Ошибка платежа',
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: recurringPaymentLastWithdrawFailureTemplate({
            recipientName,
            buttonLink: slashAgnostic(this.frontendUrl, `chat?chatId=${chatId}`),
          }),
        },
      },
    };

    return message;
  }
}
