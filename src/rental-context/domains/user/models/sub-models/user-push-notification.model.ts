import { UserPushNotificationProps } from '@domains/user/domain/value-objects/notifications/user-push-notification.value-object';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserPushNotificationModel {
  @Field(() => Boolean)
  reminderUnreadMessages: boolean;

  @Field(() => Boolean)
  newMessages: boolean;

  @Field(() => Boolean)
  bookingRequestSent: boolean;

  @Field(() => Boolean)
  bookingRequestUpdated: boolean;

  @Field(() => Boolean)
  contractOfferSent: boolean;

  @Field(() => Boolean)
  contractOfferUpdated: boolean;

  @Field(() => Boolean)
  contractCompleted: boolean;

  @Field(() => Boolean)
  contractConcluded: boolean;

  @Field(() => Boolean)
  contractRejectedByAdmin: boolean;

  @Field(() => Boolean)
  bookingRequestAccepted: boolean;

  @Field(() => Boolean)
  changesInPassportDetails: boolean;

  @Field(() => Boolean)
  reminderTenantUpcomingEntryDate: boolean;

  @Field(() => Boolean)
  reminderLandlordUpcomingEntryDate: boolean;

  @Field(() => Boolean)
  recurringPaymentSuccess: boolean;

  @Field(() => Boolean)
  recurringPaymentFailure: boolean;

  @Field(() => Boolean)
  adApproved: boolean;

  @Field(() => Boolean)
  adRejected: boolean;

  @Field(() => Boolean)
  adStatusUpdatedByAdmin: boolean;

  @Field(() => Boolean)
  adRemovedByAdmin: boolean;

  @Field(() => Boolean)
  adUpdatedByAdmin: boolean;

  static create(userEmailNotification: UserPushNotificationProps) {
    const payload = new UserPushNotificationModel();

    Object.assign(payload, userEmailNotification);

    return payload;
  }
}
