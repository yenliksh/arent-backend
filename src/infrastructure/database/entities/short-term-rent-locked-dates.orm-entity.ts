import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';

import { ShortTermRentOrmEntity } from './short-term-rent.orm-entity';

export class ShortTermRentLockedDateOrmEntity extends ObjectionEntityBase {
  static create(data: Omit<ShortTermRentLockedDateOrmEntity, keyof Model>) {
    return ShortTermRentLockedDateOrmEntity.fromJson(data);
  }

  static tableName = 'short_term_rent_locked_dates';

  shortTermRentId: string;

  startDate: string;
  endDate: string;

  shortTermRent?: ShortTermRentOrmEntity;

  static relationMappings: RelationMappingsThunk = () => {
    return {
      shortTermRent: {
        relation: Model.BelongsToOneRelation,
        modelClass: ShortTermRentOrmEntity,
        join: {
          from: `${ShortTermRentLockedDateOrmEntity.tableName}.shortTermRentId`,
          to: `${ShortTermRentOrmEntity.tableName}.id`,
        },
      },
    };
  };
}
