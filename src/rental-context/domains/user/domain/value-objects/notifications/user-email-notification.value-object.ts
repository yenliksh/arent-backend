import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { ArgumentInvalidException } from '@libs/exceptions';

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

export class UserEmailNotificationVO extends ValueObject<UserEmailNotificationProps> {
  constructor(props: UserEmailNotificationProps) {
    super(props);
  }

  static create(
    {
      newMessages = true,
      bookingRequestSent = true,
      contractConcluded = true,
      businessTrains = true,
      transferSuccess = true,
      transferFailure = true,
      recurringPaymentSuccess = true,
      recurringPaymentFailure = true,
      reminderNeedToPayRent = true,
      adApproved = true,
      adRejected = true,
    }: UserEmailNotificationProps = {
      newMessages: true,
      bookingRequestSent: true,
      contractConcluded: true,
      businessTrains: true,
      transferSuccess: true,
      transferFailure: true,
      recurringPaymentSuccess: true,
      recurringPaymentFailure: true,
      reminderNeedToPayRent: true,
      adApproved: true,
      adRejected: true,
    },
  ) {
    return new UserEmailNotificationVO({
      newMessages,
      bookingRequestSent,
      contractConcluded,
      businessTrains,
      transferSuccess,
      transferFailure,
      recurringPaymentSuccess,
      recurringPaymentFailure,
      reminderNeedToPayRent,
      adApproved,
      adRejected,
    });
  }

  protected validate(props: UserEmailNotificationProps): void {
    const {
      newMessages,
      bookingRequestSent,
      contractConcluded,
      businessTrains,
      recurringPaymentSuccess,
      recurringPaymentFailure,
      reminderNeedToPayRent,
      adApproved,
      adRejected,
    } = props;

    const fields = [
      newMessages,
      bookingRequestSent,
      contractConcluded,
      businessTrains,
      recurringPaymentSuccess,
      recurringPaymentFailure,
      reminderNeedToPayRent,
      adApproved,
      adRejected,
    ];

    if (fields.some((f) => f == null)) {
      throw new ArgumentInvalidException('Email notification must have all required fields');
    }
  }
}
