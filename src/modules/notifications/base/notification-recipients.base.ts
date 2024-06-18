import { UserChatRole } from '@domains/chat/domain/types';
import { ConfigService } from '@nestjs/config';

import { NotificationRecipientsBuilder } from './notification-recipients.builder';
import { INotificationRecipient, UserWithRole } from './types';

export abstract class BaseNotificationRecipients {
  protected emailFrom: string;
  protected frontendUrl: string;

  constructor(configService: ConfigService) {
    this.emailFrom = configService.get<string>('ses.emailFrom') as string;
    this.frontendUrl = configService.get<string>('frontEnd.url') as string;
  }

  abstract handle(...props: any): void;

  protected builder<T extends INotificationRecipient>(recipient: T): NotificationRecipientsBuilder<T>;
  protected builder<T extends INotificationRecipient>(recipients: T[]): NotificationRecipientsBuilder<T>;
  protected builder<T extends INotificationRecipient>(recipients: T | T[]): NotificationRecipientsBuilder<T> {
    if (Array.isArray(recipients)) {
      return new NotificationRecipientsBuilder(recipients);
    }

    return new NotificationRecipientsBuilder([recipients]);
  }

  protected setUserRole<T extends INotificationRecipient>(
    recipients: T[],
    options: { tenantIds: string[]; landlordIds: string[] },
  ): UserWithRole<T>[] {
    const { tenantIds, landlordIds } = options;

    const recipientsWithRole = recipients.map((recipient) => {
      const isTenant = tenantIds.includes(recipient.id);

      if (isTenant) {
        return { ...recipient, role: UserChatRole.TENANT };
      }

      const isLandlord = landlordIds.includes(recipient.id);

      if (isLandlord) {
        return { ...recipient, role: UserChatRole.LANDLORD };
      }

      return undefined;
    });

    return recipientsWithRole.filter((i) => i != null) as UserWithRole<T>[];
  }
}
