import { UserComplaintType } from '@domains/user-complaint/domain/types';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';

import { UserOrmEntity } from './user.orm-entity';

export class UserComplaintOrmEntity extends ObjectionEntityBase {
  static create(data: Omit<UserComplaintOrmEntity, keyof Model>) {
    return UserComplaintOrmEntity.fromJson(data);
  }

  static tableName = 'user_complaints';

  senderUserId: string;
  recipientUserId: string;

  type: UserComplaintType[];
  reason?: string | null;

  sender?: UserOrmEntity;
  landlord?: UserOrmEntity;

  isViewed: boolean;

  static relationMappings: RelationMappingsThunk = () => {
    return {
      sender: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserOrmEntity,
        join: {
          from: `${UserComplaintOrmEntity.tableName}.senderId`,
          to: `${UserOrmEntity.tableName}.id`,
        },
      },

      landlord: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserOrmEntity,
        join: {
          from: `${UserComplaintOrmEntity.tableName}.landlordId`,
          to: `${UserOrmEntity.tableName}.id`,
        },
      },
    };
  };
}
