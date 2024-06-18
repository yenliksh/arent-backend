import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { slashAgnostic } from '@libs/utils/slash-agnostic';
import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Destination, Message } from 'aws-sdk/clients/ses';

import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { RecurringPaymentWithdrawFailureEvent } from './recurring-payment-withdraw-failure.event';
import { recurringPaymentWithdrawFailureTemplate } from './recurring-payment-withdraw-failure.template';

@Injectable()
export class RecurringPaymentWithdrawFailureService extends BaseNotificationRecipients {
  constructor(private readonly simpleEmailService: SimpleEmailService, configService: ConfigService) {
    super(configService);
  }

  async handle({ recipientId }: RecurringPaymentWithdrawFailureEvent) {
    const recipient = await UserOrmEntity.query().findById(recipientId.value);

    if (!recipient) {
      return;
    }

    const filteredEmailRecipients = this.builder(recipient)
      .filterByEmailVerified()
      .filterByEmailParams('recurringPaymentFailure')
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
        Data: '❌ Ошибка платежа',
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: recurringPaymentWithdrawFailureTemplate({
            recipientName,
            buttonLink: slashAgnostic(this.frontendUrl, `my-profile?activeTab=PAYMENTS`),
          }),
        },
      },
    };

    return message;
  }
}
