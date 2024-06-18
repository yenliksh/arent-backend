import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface UserPushNotificationProps {
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
}
export declare class UserPushNotificationVO extends ValueObject<UserPushNotificationProps> {
    constructor(props: UserPushNotificationProps);
    static create({ reminderUnreadMessages, newMessages, bookingRequestSent, bookingRequestUpdated, contractOfferSent, contractOfferUpdated, contractCompleted, contractConcluded, contractRejectedByAdmin, bookingRequestAccepted, changesInPassportDetails, reminderTenantUpcomingEntryDate, reminderLandlordUpcomingEntryDate, recurringPaymentSuccess, recurringPaymentFailure, adApproved, adRejected, adStatusUpdatedByAdmin, adRemovedByAdmin, adUpdatedByAdmin, }?: UserPushNotificationProps): UserPushNotificationVO;
    protected validate(props: UserPushNotificationProps): void;
}
