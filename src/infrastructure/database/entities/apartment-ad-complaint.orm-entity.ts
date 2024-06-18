import { AdComplaintType } from '@domains/apartment-ad-complaint/domain/types';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';

import { ApartmentAdOrmEntity } from './apartment-ad.orm-entity';
import { UserOrmEntity } from './user.orm-entity';

export class ApartmentAdComplaintOrmEntity extends ObjectionEntityBase {
  static create(data: Omit<ApartmentAdComplaintOrmEntity, keyof Model>) {
    return ApartmentAdComplaintOrmEntity.fromJson(data);
  }

  static tableName = 'apartment_ad_complaints';

  userId: string;
  apartmentAdId: string;

  type: AdComplaintType[];
  reason?: string | null;

  apartmentAd?: ApartmentAdOrmEntity;
  user?: UserOrmEntity;

  isViewed: boolean;

  static relationMappings: RelationMappingsThunk = () => {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserOrmEntity,
        join: {
          from: `${ApartmentAdComplaintOrmEntity.tableName}.userId`,
          to: `${UserOrmEntity.tableName}.id`,
        },
      },

      apartmentAd: {
        relation: Model.BelongsToOneRelation,
        modelClass: ApartmentAdOrmEntity,
        join: {
          from: `${ApartmentAdComplaintOrmEntity.tableName}.apartmentAdId`,
          to: `${ApartmentAdOrmEntity.tableName}.id`,
        },
      },
    };
  };
}
