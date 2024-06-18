import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { ArgumentInvalidException } from '@libs/exceptions';

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

export class UserPushNotificationVO extends ValueObject<UserPushNotificationProps> {
  constructor(props: UserPushNotificationProps) {
    super(props);
  }

  static create(
    {
      reminderUnreadMessages = true,
      newMessages = true,

      bookingRequestSent = true,
      bookingRequestUpdated = true,

      contractOfferSent = true,
      contractOfferUpdated = true,

      contractCompleted = true,
      contractConcluded = true,
      contractRejectedByAdmin = true,

      bookingRequestAccepted = true,
      changesInPassportDetails = true,

      reminderTenantUpcomingEntryDate = true,
      reminderLandlordUpcomingEntryDate = true,

      recurringPaymentSuccess = true,
      recurringPaymentFailure = true,

      adApproved = true,
      adRejected = true,
      adStatusUpdatedByAdmin = true,
      adRemovedByAdmin = true,
      adUpdatedByAdmin = true,
    }: UserPushNotificationProps = {
      reminderUnreadMessages: true,
      newMessages: true,

      bookingRequestSent: true,
      bookingRequestUpdated: true,

      contractOfferSent: true,
      contractOfferUpdated: true,

      contractCompleted: true,
      contractConcluded: true,
      contractRejectedByAdmin: true,

      bookingRequestAccepted: true,
      changesInPassportDetails: true,

      reminderTenantUpcomingEntryDate: true,
      reminderLandlordUpcomingEntryDate: true,

      recurringPaymentSuccess: true,
      recurringPaymentFailure: true,

      adApproved: true,
      adRejected: true,
      adStatusUpdatedByAdmin: true,
      adRemovedByAdmin: true,
      adUpdatedByAdmin: true,
    },
  ) {
    return new UserPushNotificationVO({
      reminderUnreadMessages,
      newMessages,

      bookingRequestSent,
      bookingRequestUpdated,

      contractOfferSent,
      contractOfferUpdated,

      contractCompleted,
      contractConcluded,
      contractRejectedByAdmin,

      bookingRequestAccepted,
      changesInPassportDetails,

      reminderTenantUpcomingEntryDate,
      reminderLandlordUpcomingEntryDate,

      recurringPaymentSuccess,
      recurringPaymentFailure,

      adApproved,
      adRejected,
      adStatusUpdatedByAdmin,
      adRemovedByAdmin,
      adUpdatedByAdmin,
    });
  }

  protected validate(props: UserPushNotificationProps): void {
    const {
      reminderUnreadMessages,
      newMessages,

      bookingRequestSent,
      bookingRequestUpdated,

      contractOfferSent,
      contractOfferUpdated,

      contractCompleted,
      contractConcluded,
      contractRejectedByAdmin,

      bookingRequestAccepted,
      changesInPassportDetails,

      reminderTenantUpcomingEntryDate,
      reminderLandlordUpcomingEntryDate,

      recurringPaymentSuccess,
      recurringPaymentFailure,

      adApproved,
      adRejected,
      adStatusUpdatedByAdmin,
      adRemovedByAdmin,
      adUpdatedByAdmin,
    } = props;

    const fields = [
      reminderUnreadMessages,
      newMessages,

      bookingRequestSent,
      bookingRequestUpdated,

      contractOfferSent,
      contractOfferUpdated,

      contractCompleted,
      contractConcluded,
      contractRejectedByAdmin,

      bookingRequestAccepted,
      changesInPassportDetails,

      reminderTenantUpcomingEntryDate,
      reminderLandlordUpcomingEntryDate,

      recurringPaymentSuccess,
      recurringPaymentFailure,

      adApproved,
      adRejected,
      adStatusUpdatedByAdmin,
      adRemovedByAdmin,
      adUpdatedByAdmin,
    ];

    if (fields.some((f) => f == null)) {
      throw new ArgumentInvalidException('Push notification must have all required fields');
    }
  }
}
