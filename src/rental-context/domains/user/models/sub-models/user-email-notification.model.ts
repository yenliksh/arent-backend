import { UserEmailNotificationProps } from '@domains/user/domain/value-objects/notifications/user-email-notification.value-object';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserEmailNotificationModel {
  @Field(() => Boolean)
  newMessages: boolean;

  @Field(() => Boolean)
  bookingRequest: boolean;

  @Field(() => Boolean)
  contractConcluded: boolean;

  @Field(() => Boolean)
  businessTrains: boolean;

  @Field(() => Boolean)
  recurringPaymentSuccess: boolean;

  @Field(() => Boolean)
  recurringPaymentFailure: boolean;

  @Field(() => Boolean)
  reminderNeedToPayRent: boolean;

  @Field(() => Boolean)
  adApproved: boolean;

  @Field(() => Boolean)
  adRejected: boolean;

  static create(userEmailNotification: UserEmailNotificationProps) {
    const payload = new UserEmailNotificationModel();

    Object.assign(payload, userEmailNotification);

    return payload;
  }
}
