import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';

import { InnopayCardOrmEntity } from './innopay-card.orm-entity';

export class InnopayUsersOrmEntity extends ObjectionEntityBase {
  static create(data: Omit<InnopayUsersOrmEntity, keyof Model>) {
    return InnopayUsersOrmEntity.fromJson(data);
  }

  static tableName = 'innopay_users';

  id: string;
  userId: string;
  cnpUserId: number;
  isCrediting: boolean; // hotfix

  cards?: InnopayCardOrmEntity[];

  static relationMappings: RelationMappingsThunk = () => {
    return {
      cards: {
        relation: Model.HasManyRelation,
        modelClass: InnopayCardOrmEntity,
        join: {
          from: `${InnopayUsersOrmEntity.tableName}.id`,
          to: `${InnopayCardOrmEntity.tableName}.innopayId`,
        },
      },
    };
  };
}
