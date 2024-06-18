import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface UserEmailNotificationProps {
    newMessages: boolean;
    bookingRequestSent: boolean;
    contractConcluded: boolean;
    businessTrains: boolean;
    transferSuccess: boolean;
    transferFailure: boolean;
    recurringPaymentSuccess: boolean;
    recurringPaymentFailure: boolean;
    reminderNeedToPayRent: boolean;
    adApproved: boolean;
    adRejected: boolean;
}
export declare class UserEmailNotificationVO extends ValueObject<UserEmailNotificationProps> {
    constructor(props: UserEmailNotificationProps);
    static create({ newMessages, bookingRequestSent, contractConcluded, businessTrains, transferSuccess, transferFailure, recurringPaymentSuccess, recurringPaymentFailure, reminderNeedToPayRent, adApproved, adRejected, }?: UserEmailNotificationProps): UserEmailNotificationVO;
    protected validate(props: UserEmailNotificationProps): void;
}
