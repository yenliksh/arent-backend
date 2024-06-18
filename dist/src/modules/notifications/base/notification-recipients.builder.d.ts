import { UserEmailNotificationProps } from '@domains/user/domain/value-objects/notifications/user-email-notification.value-object';
import { UserPushNotificationProps } from '@domains/user/domain/value-objects/notifications/user-push-notification.value-object';
import { UserSmsNotificationProps } from '@domains/user/domain/value-objects/notifications/user-sms-notification.value-object';
import { INotificationRecipient } from './types';
export declare class NotificationRecipientsBuilder<T extends INotificationRecipient> {
    private props;
    constructor(recipients: T[]);
    private get recipients();
    get(): T[];
    getOne(): T | undefined;
    filterByEmailVerified(): this;
    filterByEmailParams(param: keyof UserEmailNotificationProps): this;
    filterByPushParams(param: keyof UserPushNotificationProps): this;
    filterBySmsParams(param: keyof UserSmsNotificationProps): this;
}
