import { GenderType, IdentityStatusType } from '@domains/user/domain/types';
import { GuarantorProps } from '@domains/user/domain/value-objects/guarantor.value-object';
import { UserEmailNotificationProps } from '@domains/user/domain/value-objects/notifications/user-email-notification.value-object';
import { UserPushNotificationProps } from '@domains/user/domain/value-objects/notifications/user-push-notification.value-object';
import { UserSmsNotificationProps } from '@domains/user/domain/value-objects/notifications/user-sms-notification.value-object';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';

import { ApartmentAdComplaintOrmEntity } from './apartment-ad-complaint.orm-entity';
import { ChatMemberOrmEntity } from './chat-member.orm-entity';
import { UserComplaintOrmEntity } from './user-complaint.orm-entity';

export class UserOrmEntity extends ObjectionEntityBase {
  static create(data: Omit<UserOrmEntity, keyof Model>) {
    return UserOrmEntity.fromJson(data);
  }

  static tableName = 'users';

  phone?: string | null;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  middleName?: string | null;
  email: string;
  birthDate?: string | null;
  avatarKey?: string | null;
  gender?: GenderType;
  identityStatus: IdentityStatusType;
  identityDocuments?: string[];
  identityRejectReason?: string;
  identityUpdatedAt: Date;
  numberFines: number;

  isPhoneApproved: boolean;
  guarantors?: GuarantorProps[];

  chatMembers?: ChatMemberOrmEntity[];

  apartmentAdComplaints?: ApartmentAdComplaintOrmEntity[];
  sentComplaints?: UserComplaintOrmEntity[];
  receivedComplaints?: UserComplaintOrmEntity[];

  emailNotification: UserEmailNotificationProps;
  pushNotification: UserPushNotificationProps;
  smsNotification: UserSmsNotificationProps;

  static relationMappings: RelationMappingsThunk = () => {
    return {
      chatMembers: {
        relation: Model.HasManyRelation,
        modelClass: ChatMemberOrmEntity,
        join: {
          from: `${UserOrmEntity.tableName}.id`,
          to: `${ChatMemberOrmEntity.tableName}.memberId`,
        },
      },

      apartmentAdComplaints: {
        relation: Model.HasManyRelation,
        modelClass: ApartmentAdComplaintOrmEntity,
        join: {
          from: `${UserOrmEntity.tableName}.id`,
          to: `${ApartmentAdComplaintOrmEntity.tableName}.userId`,
        },
      },

      sentComplaints: {
        relation: Model.HasManyRelation,
        modelClass: UserComplaintOrmEntity,
        join: {
          from: `${UserOrmEntity.tableName}.id`,
          to: `${UserComplaintOrmEntity.tableName}.senderId`,
        },
      },

      receivedComplaints: {
        relation: Model.HasManyRelation,
        modelClass: UserComplaintOrmEntity,
        join: {
          from: `${UserOrmEntity.tableName}.id`,
          to: `${UserComplaintOrmEntity.tableName}.landlordId`,
        },
      },
    };
  };

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        guarantors: { type: 'array' },
      },
    };
  }
}
