import { UserSmsNotificationProps } from '@domains/user/domain/value-objects/notifications/user-sms-notification.value-object';
export declare class UserSmsNotificationModel {
    reminderUnreadMessages: boolean;
    accountRemovedByAdmin: boolean;
    bookingRequestUpdated: boolean;
    contractCancellationOfTheLease: boolean;
    reminderUpcomingDepartureDate: boolean;
    reminderNeedToPayRent: boolean;
    static create(userEmailNotification: UserSmsNotificationProps): UserSmsNotificationModel;
}
