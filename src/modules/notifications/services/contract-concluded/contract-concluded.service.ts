import { UserChatRole } from '@domains/chat/domain/types';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ID } from '@libs/ddd/domain/value-objects/id.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { DateUtil } from '@libs/utils/date-util';
import { toMinorUnitString } from '@libs/utils/minimal-unit.helper';
import { slashAgnostic } from '@libs/utils/slash-agnostic';
import { TimezoneUtil } from '@libs/utils/timezone-util';
import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { UserWithRole } from '@modules/notifications/base/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Destination, Message } from 'aws-sdk/clients/ses';

import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { contractConcludedLandlordTemplate } from './contract-concluded-landlord.template';
import { contractConcludedTenantTemplate } from './contract-concluded-tenant.template';
import { ContractConcludedEvent } from './contract-concluded.event';

@Injectable()
export class ContractConcludedService extends BaseNotificationRecipients {
  constructor(private readonly simpleEmailService: SimpleEmailService, configService: ConfigService) {
    super(configService);
  }

  async handle({ tenantId, landlordId, chatId, contractId, paymentTransactionId }: ContractConcludedEvent) {
    const filteredRecipientsWithRoleQuery = this.getFilteredRecipientsWithRole([tenantId, landlordId]);
    const paymentTransactionQuery = PaymentTransactionOrmEntity.query().findById(paymentTransactionId.value);
    const contractQuery = ContractOrmEntity.query().findById(contractId.value);

    const [filteredRecipientsWithRole, contract, paymentTransaction] = await Promise.all([
      filteredRecipientsWithRoleQuery,
      contractQuery,
      paymentTransactionQuery,
    ]);

    if (!contract || !paymentTransaction || contract?.id !== paymentTransaction?.contractId) {
      return;
    }

    await this.sendEmailNotification({ recipients: filteredRecipientsWithRole, chatId, contract, paymentTransaction });
  }

  private async getFilteredRecipientsWithRole([tenantId, landlordId]: [ID, ID]): Promise<
    UserWithRole<UserOrmEntity>[]
  > {
    const recipients = await UserOrmEntity.query().findByIds([tenantId.value, landlordId.value]);

    const recipientsWithRole = this.setUserRole(recipients, {
      tenantIds: [tenantId.value],
      landlordIds: [landlordId.value],
    });

    const filteredEmailRecipients = this.builder(recipientsWithRole)
      .filterByEmailVerified()
      .filterByEmailParams('contractConcluded')
      .get();

    return filteredEmailRecipients;
  }

  private async sendEmailNotification({
    recipients,
    chatId,
    contract,
    paymentTransaction,
  }: {
    recipients: UserWithRole<UserOrmEntity>[];
    chatId: UUID;
    contract: ContractOrmEntity;
    paymentTransaction: PaymentTransactionOrmEntity;
  }) {
    recipients.map((recipient) => {
      const recipientName = `${recipient.firstName} ${recipient.lastName}`;
      const recipientEmail = recipient.email;

      const destination: Destination = {
        ToAddresses: [recipientEmail],
      };

      const message: Message =
        recipient.role === UserChatRole.TENANT
          ? this.tenantTemplateMessage({ recipientName, payloadId: contract.id, contract, paymentTransaction })
          : this.landlordTemplateMessage({ recipientName, payloadId: chatId.value });

      this.simpleEmailService.sendEmail({
        source: this.emailFrom,
        destination,
        message,
      });
    });
  }

  private tenantTemplateMessage({
    recipientName,
    payloadId,
    contract,
    paymentTransaction,
  }: {
    recipientName: string;
    payloadId: string;
    contract: ContractOrmEntity;
    paymentTransaction: PaymentTransactionOrmEntity;
  }) {
    const { address } = contract.baseApartmentAdData;
    const collectedAddress = `${address.street}  ${address.houseNumber},  ${address.city}, ${
      address.country === 'KZ' ? 'Казахстан' : address.country
    }`;
    const tz = TimezoneUtil.getOffsetByCords({ lat: address.geoPoint.lat, lng: address.geoPoint.lng });

    const message: Message = {
      Subject: {
        Charset: 'UTF-8',
        Data: '🎉 Подтверждение аренды',
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: contractConcludedTenantTemplate({
            withdrawFundsDate: DateUtil.parseWithZone(paymentTransaction.withdrawFundsDate, tz).format(
              'DD.MM.YYYY HH:mm:ss',
            ),
            paymentAmount: toMinorUnitString(paymentTransaction.totalAmountPayable),
            currency: '₸',
            address: collectedAddress,
            startDate: DateUtil.parseWithZone(paymentTransaction.startDate, tz).format('DD.MM.YYYY HH:mm:ss'),
            endDate: DateUtil.parseWithZone(paymentTransaction.endDate, tz).format('DD.MM.YYYY HH:mm:ss'),
            recipientName,
            buttonLink: slashAgnostic(this.frontendUrl, `active-rent?id=${payloadId}`),
          }),
        },
      },
    };

    return message;
  }

  private landlordTemplateMessage({ recipientName, payloadId }: { recipientName: string; payloadId: string }) {
    const message: Message = {
      Subject: {
        Charset: 'UTF-8',
        Data: '🎉 Подтверждение аренды',
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: contractConcludedLandlordTemplate({
            recipientName,
            buttonLink: slashAgnostic(this.frontendUrl, `dashboard?activeTab=CHAT&chatId=${payloadId}`),
          }),
        },
      },
    };

    return message;
  }
}
