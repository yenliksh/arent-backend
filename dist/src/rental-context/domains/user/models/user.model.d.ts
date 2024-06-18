import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { GenderType, IdentityStatusType } from '../domain/types';
import { GuarantorModel } from './sub-models/guarantor.model';
import { UserEmailNotificationModel } from './sub-models/user-email-notification.model';
import { UserPushNotificationModel } from './sub-models/user-push-notification.model';
import { UserSmsNotificationModel } from './sub-models/user-sms-notification.model';
export declare abstract class BaseUserModel extends ModelBase {
    protected constructor(user: UserOrmEntity);
    firstName: string;
    middleName?: string;
    lastName: string;
    avatarKey?: string;
    birthDate?: string;
    gender?: GenderType;
    isIdentityApproved: boolean;
    isPhoneApproved: boolean;
    isEmailVerified: boolean;
}
export declare class UserMeModel extends BaseUserModel {
    private constructor();
    phone?: string;
    email: string;
    identityStatus: IdentityStatusType;
    identityDocuments?: string[];
    identityRejectReason?: string;
    guarantors?: GuarantorModel[];
    emailNotification: UserEmailNotificationModel;
    pushNotification: UserPushNotificationModel;
    smsNotification: UserSmsNotificationModel;
    static create(user: UserOrmEntity): UserMeModel;
}
export declare class UserModel extends BaseUserModel {
    private constructor();
    static create(user: UserOrmEntity): UserModel;
}
