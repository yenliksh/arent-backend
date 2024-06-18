import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { PaymentTransactionStatus } from '@domains/payment-transaction/domain/types';
import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { DateUtil } from '@libs/utils/date-util';
import { toMinorUnit } from '@libs/utils/minimal-unit.helper';
import { slashAgnostic } from '@libs/utils/slash-agnostic';
import { TimezoneUtil } from '@libs/utils/timezone-util';
import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Destination, Message } from 'aws-sdk/clients/ses';

import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { reminderNeedToPayRentTemplate } from './reminder-need-to-pay-rent.template';

@Injectable()
export class ReminderNeedToPayRentService extends BaseNotificationRecipients {
  constructor(private readonly simpleEmailService: SimpleEmailService, configService: ConfigService) {
    super(configService);
  }

  async handle() {
    const paymentTransactions = await PaymentTransactionOrmEntity.query()
      .withGraphFetched({ contract: { tenant: true } }, { joinOperation: 'innerJoin' })
      .where({ status: PaymentTransactionStatus.CASH_IN_WAITING, isRecurring: true })
      .andWhere(
        'withdrawFundsDate',
        '<=',
        `${DateUtil.now().add(PaymentTransactionEntity.EARLY_PAY_DAYS, 'day').toISOString()}`,
      );

    await this.sendEmailNotification(paymentTransactions);
  }

  private async sendEmailNotification(paymentTransactions: PaymentTransactionOrmEntity[]) {
    return Promise.all(
      paymentTransactions.map((pt) => {
        if (!pt.contract || !pt.contract.tenant) {
          return;
        }

        const filteredEmailRecipient = this.builder(pt.contract.tenant)
          .filterByEmailVerified()
          .filterByEmailParams('reminderNeedToPayRent')
          .getOne();

        if (!filteredEmailRecipient) {
          return;
        }

        const recipientName = `${filteredEmailRecipient.firstName} ${filteredEmailRecipient.lastName}`;
        const recipientEmail = filteredEmailRecipient.email;
        const address = pt.contract.baseApartmentAdData.address;
        const collectedAddress = `${address.street}  ${address.houseNumber},  ${address.city}, ${
          address.country === 'KZ' ? 'Казахстан' : address.country
        }`;
        const tz = TimezoneUtil.getOffsetByCords({ lat: address.geoPoint.lat, lng: address.geoPoint.lng });

        const destination: Destination = {
          ToAddresses: [recipientEmail],
        };

        const message: Message = this.templateMessage({
          recipientName,
          withdrawFundsDate: pt.withdrawFundsDate,
          address: collectedAddress,
          amount: pt.totalAmountPayable,
          tz,
        });

        return this.simpleEmailService.sendEmail({
          source: this.emailFrom,
          destination,
          message,
        });
      }),
    );
  }

  private templateMessage({
    recipientName,
    withdrawFundsDate,
    amount,
    address,
    tz,
  }: {
    recipientName: string;
    withdrawFundsDate: Date;
    amount: number;
    address: string;
    tz: string;
  }) {
    const message: Message = {
      Subject: {
        Charset: 'UTF-8',
        Data: '⏰ Пора платить за аренду',
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: reminderNeedToPayRentTemplate({
            recipientName,
            withdrawFundsDate: DateUtil.parseWithZone(withdrawFundsDate, tz).format('DD.MM.YYYY HH:mm:ss'),
            paymentAmount: toMinorUnit(amount),
            address,
            currency: '₸',
            buttonLink: slashAgnostic(this.frontendUrl, `my-profile?activeTab=PAYMENTS`),
          }),
        },
      },
    };

    return message;
  }
}
