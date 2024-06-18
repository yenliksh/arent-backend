import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { prependDomainUrlToFileKey } from '@libs/utils/file-key.helper';
import { getCfSignedUrl } from '@libs/utils/get-cf-signed-url';
import { Field, ObjectType } from '@nestjs/graphql';

import { GenderType, IdentityStatusType } from '../domain/types';
import { GuarantorModel } from './sub-models/guarantor.model';
import { UserEmailNotificationModel } from './sub-models/user-email-notification.model';
import { UserPushNotificationModel } from './sub-models/user-push-notification.model';
import { UserSmsNotificationModel } from './sub-models/user-sms-notification.model';

@ObjectType()
export abstract class BaseUserModel extends ModelBase {
  protected constructor(user: UserOrmEntity) {
    super(user);

    const assignObject: Omit<BaseUserModel, keyof ModelBase> = {
      firstName: user.firstName,
      middleName: user.middleName || undefined,
      lastName: user.lastName,
      avatarKey: user?.avatarKey ? prependDomainUrlToFileKey(user?.avatarKey) : undefined,
      birthDate: user.birthDate ? user.birthDate : undefined,
      gender: user.gender,
      isPhoneApproved: user.isPhoneApproved,
      isIdentityApproved: user.identityStatus === IdentityStatusType.APPROVED,
      isEmailVerified: user.isEmailVerified,
    };

    Object.assign(this, assignObject);
  }

  @Field(() => String)
  firstName: string;

  @Field(() => String, { nullable: true })
  middleName?: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String, { nullable: true })
  avatarKey?: string;

  @Field(() => String, { nullable: true })
  birthDate?: string;

  @Field(() => GenderType, { nullable: true })
  gender?: GenderType;

  @Field(() => Boolean)
  isIdentityApproved: boolean;

  @Field(() => Boolean)
  isPhoneApproved: boolean;

  @Field(() => Boolean)
  isEmailVerified: boolean;
}

@ObjectType()
export class UserMeModel extends BaseUserModel {
  private constructor(user: UserOrmEntity) {
    super(user);
  }

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String)
  email: string;

  @Field(() => IdentityStatusType)
  identityStatus: IdentityStatusType;

  @Field(() => [String], { nullable: true })
  identityDocuments?: string[];

  @Field(() => String, { nullable: true })
  identityRejectReason?: string;

  @Field(() => [GuarantorModel], { nullable: true })
  guarantors?: GuarantorModel[];

  @Field(() => UserEmailNotificationModel)
  emailNotification: UserEmailNotificationModel;

  @Field(() => UserPushNotificationModel)
  pushNotification: UserPushNotificationModel;

  @Field(() => UserSmsNotificationModel)
  smsNotification: UserSmsNotificationModel;

  static create(user: UserOrmEntity) {
    const payload = new UserMeModel(user);

    const assignObject: Omit<UserMeModel, keyof BaseUserModel> = {
      phone: user.phone ? user.phone : undefined,
      email: user.email,
      identityStatus: user.identityStatus,
      identityDocuments: user.identityDocuments?.map((i) => getCfSignedUrl(prependDomainUrlToFileKey(i, 'private'))),
      identityRejectReason: user.identityRejectReason,
      guarantors: user.guarantors ? user.guarantors.map(GuarantorModel.create) : undefined,
      emailNotification: UserEmailNotificationModel.create(user.emailNotification),
      pushNotification: UserPushNotificationModel.create(user.pushNotification),
      smsNotification: UserSmsNotificationModel.create(user.smsNotification),
    };

    Object.assign(payload, assignObject);

    return payload;
  }
}

@ObjectType()
export class UserModel extends BaseUserModel {
  private constructor(user: UserOrmEntity) {
    super(user);
  }

  static create(user: UserOrmEntity) {
    const payload = new UserModel(user);

    return payload;
  }
}
