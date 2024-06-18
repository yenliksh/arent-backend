import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { ArgumentInvalidException } from '@libs/exceptions';

export interface UserSmsNotificationProps {
  reminderUnreadMessages: boolean;

  accountRemovedByAdmin: boolean;

  bookingRequestUpdated: boolean;

  contractCancellationOfTheLease: boolean;

  reminderUpcomingDepartureDate: boolean;
  reminderNeedToPayRent: boolean;
}

export class UserSmsNotificationVO extends ValueObject<UserSmsNotificationProps> {
  constructor(props: UserSmsNotificationProps) {
    super(props);
  }

  static create(
    {
      reminderUnreadMessages = true,

      accountRemovedByAdmin = true,

      bookingRequestUpdated = true,

      contractCancellationOfTheLease = true,

      reminderUpcomingDepartureDate = true,
      reminderNeedToPayRent = true,
    }: UserSmsNotificationProps = {
      reminderUnreadMessages: true,

      accountRemovedByAdmin: true,

      bookingRequestUpdated: true,

      contractCancellationOfTheLease: true,

      reminderUpcomingDepartureDate: true,
      reminderNeedToPayRent: true,
    },
  ) {
    return new UserSmsNotificationVO({
      reminderUnreadMessages,

      accountRemovedByAdmin,

      bookingRequestUpdated,

      contractCancellationOfTheLease,

      reminderUpcomingDepartureDate,
      reminderNeedToPayRent,
    });
  }

  protected validate(props: UserSmsNotificationProps): void {
    const {
      reminderUnreadMessages,

      accountRemovedByAdmin,

      bookingRequestUpdated,

      contractCancellationOfTheLease,

      reminderUpcomingDepartureDate,
      reminderNeedToPayRent,
    } = props;

    const fields = [
      reminderUnreadMessages,

      accountRemovedByAdmin,

      bookingRequestUpdated,

      contractCancellationOfTheLease,

      reminderUpcomingDepartureDate,
      reminderNeedToPayRent,
    ];

    if (fields.some((f) => f == null)) {
      throw new ArgumentInvalidException('Sms notification must have all required fields');
    }
  }
}
