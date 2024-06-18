import { UserSmsNotificationProps } from '@domains/user/domain/value-objects/notifications/user-sms-notification.value-object';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserSmsNotificationModel {
  @Field(() => Boolean)
  reminderUnreadMessages: boolean;

  @Field(() => Boolean)
  accountRemovedByAdmin: boolean;

  @Field(() => Boolean)
  bookingRequestUpdated: boolean;

  @Field(() => Boolean)
  contractCancellationOfTheLease: boolean;

  @Field(() => Boolean)
  reminderUpcomingDepartureDate: boolean;

  @Field(() => Boolean)
  reminderNeedToPayRent: boolean;

  static create(userEmailNotification: UserSmsNotificationProps) {
    const payload = new UserSmsNotificationModel();

    Object.assign(payload, userEmailNotification);

    return payload;
  }
}
