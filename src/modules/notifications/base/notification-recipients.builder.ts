import { UserEmailNotificationProps } from '@domains/user/domain/value-objects/notifications/user-email-notification.value-object';
import { UserPushNotificationProps } from '@domains/user/domain/value-objects/notifications/user-push-notification.value-object';
import { UserSmsNotificationProps } from '@domains/user/domain/value-objects/notifications/user-sms-notification.value-object';

import { INotificationRecipient } from './types';

export class NotificationRecipientsBuilder<T extends INotificationRecipient> {
  private props: { recipients: T[] } = {
    recipients: [],
  };

  constructor(recipients: T[]) {
    this.props.recipients = recipients;
  }

  private get recipients() {
    return this.props.recipients;
  }

  get(): T[] {
    return this.props.recipients;
  }

  getOne(): T | undefined {
    return this.props.recipients[0];
  }

  filterByEmailVerified() {
    this.props.recipients = this.recipients.filter((r) => r.isEmailVerified);

    return this;
  }

  filterByEmailParams(param: keyof UserEmailNotificationProps) {
    this.props.recipients = this.recipients.filter((u) => !!u.emailNotification[param]);

    return this;
  }

  filterByPushParams(param: keyof UserPushNotificationProps) {
    this.props.recipients = this.recipients.filter((u) => !!u.pushNotification[param]);

    return this;
  }

  filterBySmsParams(param: keyof UserSmsNotificationProps) {
    this.props.recipients = this.recipients.filter((u) => !!u.smsNotification[param]);

    return this;
  }
}
