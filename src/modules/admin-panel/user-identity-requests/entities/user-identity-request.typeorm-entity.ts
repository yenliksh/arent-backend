import { GuarantorProps } from '@domains/user/domain/value-objects/guarantor.value-object';
import { UserEmailNotificationProps } from '@domains/user/domain/value-objects/notifications/user-email-notification.value-object';
import { UserPushNotificationProps } from '@domains/user/domain/value-objects/notifications/user-push-notification.value-object';
import { UserSmsNotificationProps } from '@domains/user/domain/value-objects/notifications/user-sms-notification.value-object';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { Model } from 'objection';
import { GenderType, IdentityStatusType } from 'src/rental-context/domains/user/domain/types';
import { ViewColumn, ViewEntity } from 'typeorm';

const tableName = 'user_identity_requests';

type IUserIdentityRequests = Omit<UserOrmEntity, keyof Model>;

@ViewEntity({
  name: tableName,
  expression: (connection) =>
    connection
      .createQueryBuilder()
      .select('users.id', 'id')
      .addSelect('users.firstName', 'firstName')
      .addSelect('users.lastName', 'lastName')
      .addSelect('users.middleName', 'middleName')
      .addSelect('users.email', 'email')
      .addSelect('users.birthDate', 'birthDate')
      .addSelect('users.isEmailVerified', 'isEmailVerified')
      .addSelect('users.avatarKey', 'avatarKey')
      .addSelect('users.gender', 'gender')
      .addSelect('users.identityStatus', 'identityStatus')
      .addSelect('users.identityDocuments', 'identityDocuments')
      .addSelect('users.identityRejectReason', 'identityRejectReason')
      .addSelect('users.identityUpdatedAt', 'identityUpdatedAt')
      .addSelect('users.phone', 'phone')
      .addSelect('users.isPhoneApproved', 'isPhoneApproved')
      .addSelect('users.numberFines', 'numberFines')
      .addSelect('users.guarantors', 'guarantors')
      .addSelect('users.emailNotification', 'emailNotification')
      .addSelect('users.smsNotification', 'smsNotification')
      .addSelect('users.pushNotification', 'pushNotification')
      .addSelect('users.createdAt', 'createdAt')
      .addSelect('users.updatedAt', 'updatedAt')
      .addSelect('users.deletedAt', 'deletedAt')
      .from(UserOrmEntity.tableName, 'users')
      .where(`"users"."identityStatus" = '${IdentityStatusType.PROCESSING}'`)
      .andWhere(`"users"."identityDocuments" IS NOT NULL`)
      .orderBy('users.identityUpdatedAt', 'DESC'),
})
export class UserIdentityRequestTypeormEntity implements IUserIdentityRequests {
  static tableName = tableName;

  @ViewColumn()
  id: string;

  @ViewColumn()
  firstName: string;

  @ViewColumn()
  isEmailVerified: boolean;

  @ViewColumn()
  lastName: string;

  @ViewColumn()
  middleName?: string;

  @ViewColumn()
  email: string;

  @ViewColumn()
  birthDate: string;

  @ViewColumn()
  guarantors?: GuarantorProps[];

  @ViewColumn()
  emailNotification: UserEmailNotificationProps;

  @ViewColumn()
  smsNotification: UserSmsNotificationProps;

  @ViewColumn()
  pushNotification: UserPushNotificationProps;

  @ViewColumn()
  avatarKey?: string;

  @ViewColumn()
  gender?: GenderType;

  @ViewColumn()
  identityStatus: IdentityStatusType;

  @ViewColumn()
  identityDocuments?: string[];

  @ViewColumn()
  identityRejectReason?: string;

  @ViewColumn()
  identityUpdatedAt: Date;

  @ViewColumn()
  phone: string;

  @ViewColumn()
  numberFines: number;

  @ViewColumn()
  isPhoneApproved: boolean;

  @ViewColumn()
  createdAt: Date;

  @ViewColumn()
  updatedAt: Date;

  @ViewColumn()
  deletedAt?: Date;
}
