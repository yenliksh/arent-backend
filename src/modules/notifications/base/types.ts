import { UserChatRole } from '@domains/chat/domain/types';
import { UserEmailNotificationProps } from '@domains/user/domain/value-objects/notifications/user-email-notification.value-object';
import { UserPushNotificationProps } from '@domains/user/domain/value-objects/notifications/user-push-notification.value-object';
import { UserSmsNotificationProps } from '@domains/user/domain/value-objects/notifications/user-sms-notification.value-object';

export interface INotificationRecipient {
  id: string;
  isEmailVerified: boolean;
  emailNotification: UserEmailNotificationProps;
  pushNotification: UserPushNotificationProps;
  smsNotification: UserSmsNotificationProps;
}

export type UserWithRole<T extends INotificationRecipient> = T & { role: UserChatRole };
