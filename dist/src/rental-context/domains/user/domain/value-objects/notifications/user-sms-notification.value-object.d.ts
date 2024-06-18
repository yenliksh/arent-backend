import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface UserSmsNotificationProps {
    reminderUnreadMessages: boolean;
    accountRemovedByAdmin: boolean;
    bookingRequestUpdated: boolean;
    contractCancellationOfTheLease: boolean;
    reminderUpcomingDepartureDate: boolean;
    reminderNeedToPayRent: boolean;
}
export declare class UserSmsNotificationVO extends ValueObject<UserSmsNotificationProps> {
    constructor(props: UserSmsNotificationProps);
    static create({ reminderUnreadMessages, accountRemovedByAdmin, bookingRequestUpdated, contractCancellationOfTheLease, reminderUpcomingDepartureDate, reminderNeedToPayRent, }?: UserSmsNotificationProps): UserSmsNotificationVO;
    protected validate(props: UserSmsNotificationProps): void;
}
