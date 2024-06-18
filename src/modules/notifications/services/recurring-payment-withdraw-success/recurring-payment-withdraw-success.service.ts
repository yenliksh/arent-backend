import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { DateUtil } from '@libs/utils/date-util';
import { toMinorUnitString } from '@libs/utils/minimal-unit.helper';
import { slashAgnostic } from '@libs/utils/slash-agnostic';
import { TimezoneUtil } from '@libs/utils/timezone-util';
import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Destination, Message } from 'aws-sdk/clients/ses';

import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { RecurringPaymentWithdrawSuccessEvent } from './recurring-payment-withdraw-success.event';
import { recurringPaymentWithdrawSuccessTemplate } from './recurring-payment-withdraw-success.template';

@Injectable()
export class RecurringPaymentWithdrawSuccessService extends BaseNotificationRecipients {
  constructor(private readonly simpleEmailService: SimpleEmailService, configService: ConfigService) {
    super(configService);
  }

  async handle({ recipientId, contractId, paymentTransactionId }: RecurringPaymentWithdrawSuccessEvent) {
    const recipientQuery = UserOrmEntity.query().findById(recipientId.value);
    const paymentTransactionQuery = PaymentTransactionOrmEntity.query().findById(paymentTransactionId.value);
    const contractQuery = ContractOrmEntity.query().findById(contractId.value);

    const [recipient, contract, paymentTransaction] = await Promise.all([
      recipientQuery,
      contractQuery,
      paymentTransactionQuery,
    ]);

    if (!recipient || !contract || !paymentTransaction || contract?.id !== paymentTransaction?.contractId) {
      return;
    }

    const filteredEmailRecipients = this.builder(recipient)
      .filterByEmailVerified()
      .filterByEmailParams('recurringPaymentSuccess')
      .get();

    await this.sendEmailNotification({
      recipients: filteredEmailRecipients,
      contract,
      transaction: paymentTransaction,
    });
  }

  private async sendEmailNotification({
    recipients,
    contract,
    transaction,
  }: {
    recipients: UserOrmEntity[];
    contract: ContractOrmEntity;
    transaction: PaymentTransactionOrmEntity;
  }) {
    return Promise.all(
      recipients.map((recipient) => {
        const recipientName = `${recipient.firstName} ${recipient.lastName}`;
        const recipientEmail = recipient.email;

        const destination: Destination = {
          ToAddresses: [recipientEmail],
        };

        const message: Message = this.templateMessage({ recipientName, contract, transaction });

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
    contract,
    transaction,
  }: {
    recipientName: string;
    contract: ContractOrmEntity;
    transaction: PaymentTransactionOrmEntity;
  }) {
    const { address } = contract.baseApartmentAdData;
    const collectedAddress = `${address.street}  ${address.houseNumber},  ${address.city}, ${
      address.country === 'KZ' ? 'Казахстан' : address.country
    }`;
    const tz = TimezoneUtil.getOffsetByCords({ lat: address.geoPoint.lat, lng: address.geoPoint.lng });

    const message: Message = {
      Subject: {
        Charset: 'UTF-8',
        Data: '✔️ Чек об оплате',
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: recurringPaymentWithdrawSuccessTemplate({
            withdrawFundsDate: DateUtil.parseWithZone(transaction.withdrawFundsDate, tz).format('DD.MM.YYYY HH:mm:ss'),
            paymentAmount: toMinorUnitString(transaction.totalAmountPayable),
            address: collectedAddress,
            startDate: DateUtil.parseWithZone(transaction.startDate, tz).format('DD.MM.YYYY HH:mm:ss'),
            endDate: DateUtil.parseWithZone(transaction.endDate, tz).format('DD.MM.YYYY HH:mm:ss'),
            recipientName,
            buttonLink: slashAgnostic(this.frontendUrl, `my-profile?activeTab=PAYMENTS`),
          }),
        },
      },
    };

    return message;
  }
}
