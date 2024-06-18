import { UserEmailNotificationProps } from '@domains/user/domain/value-objects/notifications/user-email-notification.value-object';
export declare class UserEmailNotificationModel {
    newMessages: boolean;
    bookingRequest: boolean;
    contractConcluded: boolean;
    businessTrains: boolean;
    recurringPaymentSuccess: boolean;
    recurringPaymentFailure: boolean;
    reminderNeedToPayRent: boolean;
    adApproved: boolean;
    adRejected: boolean;
    static create(userEmailNotification: UserEmailNotificationProps): UserEmailNotificationModel;
}
