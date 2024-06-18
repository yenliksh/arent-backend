import { UserPushNotificationProps } from '@domains/user/domain/value-objects/notifications/user-push-notification.value-object';
export declare class UserPushNotificationModel {
    reminderUnreadMessages: boolean;
    newMessages: boolean;
    bookingRequestSent: boolean;
    bookingRequestUpdated: boolean;
    contractOfferSent: boolean;
    contractOfferUpdated: boolean;
    contractCompleted: boolean;
    contractConcluded: boolean;
    contractRejectedByAdmin: boolean;
    bookingRequestAccepted: boolean;
    changesInPassportDetails: boolean;
    reminderTenantUpcomingEntryDate: boolean;
    reminderLandlordUpcomingEntryDate: boolean;
    recurringPaymentSuccess: boolean;
    recurringPaymentFailure: boolean;
    adApproved: boolean;
    adRejected: boolean;
    adStatusUpdatedByAdmin: boolean;
    adRemovedByAdmin: boolean;
    adUpdatedByAdmin: boolean;
    static create(userEmailNotification: UserPushNotificationProps): UserPushNotificationModel;
}
