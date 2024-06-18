import { UserChatRole } from '@domains/chat/domain/types';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ID } from '@libs/ddd/domain/value-objects/id.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { slashAgnostic } from '@libs/utils/slash-agnostic';
import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { UserWithRole } from '@modules/notifications/base/types';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SimpleEmailService } from '@third-parties/simple-email/src';
import { Destination, Message } from 'aws-sdk/clients/ses';

import { NewMessageEvent } from './new-message.event';
import { newMessageTemplate } from './new-message.template';

@Injectable()
export class NewMessageService extends BaseNotificationRecipients {
  constructor(private readonly simpleEmailService: SimpleEmailService, configService: ConfigService) {
    super(configService);
  }

  async handle({ senderId, chatMembers, chatId }: NewMessageEvent) {
    const { recipients, sender } = await this.getRecipientsAndSender(senderId, chatMembers);

    await this.sendEmailNotification(recipients, sender, chatId);
  }

  private async getRecipientsAndSender<T extends { memberId: ID; role: UserChatRole }>(
    senderId: ID,
    chatMembers: T[],
  ): Promise<{ sender: UserWithRole<UserOrmEntity>; recipients: UserWithRole<UserOrmEntity>[] }> {
    const usersFromChat = await UserOrmEntity.query().findByIds(chatMembers.map((r) => r.memberId.value));

    const usersWithRole = this.setUserRole(usersFromChat, {
      tenantIds: chatMembers.filter((i) => i.role === UserChatRole.TENANT).map((i) => i.memberId.value),
      landlordIds: chatMembers.filter((i) => i.role === UserChatRole.LANDLORD).map((i) => i.memberId.value),
    });

    const sender = usersWithRole.find((u) => u.id === senderId.value);
    const recipients = this.builder(usersWithRole.filter((u) => u.id !== senderId.value))
      .filterByEmailVerified()
      .filterByEmailParams('newMessages')
      .get();

    if (!sender) {
      throw new UnprocessableEntityException('For send emails the sender is required');
    }

    return {
      sender,
      recipients,
    };
  }

  private async sendEmailNotification(
    recipients: UserWithRole<UserOrmEntity>[],
    sender: UserWithRole<UserOrmEntity>,
    chatId: UUID,
  ) {
    const senderName = `${sender.firstName} ${sender.lastName}`;

    const emailRequests = recipients.map<[Destination, Message]>((recipient) => {
      const recipientName = `${recipient.firstName} ${recipient.lastName}`;

      const destination: Destination = {
        ToAddresses: [recipient.email],
      };

      const senderRole = sender.role === UserChatRole.TENANT ? 'арендатора' : 'арендодателя';

      const senderChatLink =
        sender.role === UserChatRole.TENANT
          ? `dashboard?activeTab=CHAT&chatId=${chatId.value}`
          : `chat?chatId=${chatId.value}`;

      const message: Message = {
        Subject: {
          Charset: 'UTF-8',
          Data: `📝 Сообщение от ${senderRole}`,
        },
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: newMessageTemplate({
              recipientName,
              senderName,
              buttonLink: slashAgnostic(this.frontendUrl, senderChatLink),
            }),
          },
        },
      };

      return [destination, message];
    });

    await Promise.all(
      emailRequests.map(([destination, message]) =>
        this.simpleEmailService.sendEmail({
          source: this.emailFrom,
          destination,
          message,
        }),
      ),
    );
  }
}
