import { InnopayAppointmentCardType, InnopayCardType } from '@domains/innopay-card/domain/types';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';

import { ContractOrmEntity } from './contract.orm-entity';
import { InnopayUsersOrmEntity } from './innopay-users.orm-entity';

export class InnopayCardOrmEntity extends ObjectionEntityBase {
  static create(data: Omit<InnopayCardOrmEntity, keyof Model>) {
    return InnopayCardOrmEntity.fromJson(data);
  }

  static tableName = 'innopay_cards';

  id: string;
  innopayId: string;
  cnpCardId: number;
  panMasked: string;
  cardHolder: string;
  cardType: InnopayCardType;
  appointmentType: InnopayAppointmentCardType;

  innopayUser?: InnopayUsersOrmEntity;
  contracts?: InnopayCardOrmEntity[];

  static relationMappings: RelationMappingsThunk = () => {
    return {
      innopayUser: {
        relation: Model.BelongsToOneRelation,
        modelClass: InnopayUsersOrmEntity,
        join: {
          from: `${InnopayCardOrmEntity.tableName}.innopayId`,
          to: `${InnopayUsersOrmEntity.tableName}.id`,
        },
      },
      contracts: {
        relation: Model.HasManyRelation,
        modelClass: ContractOrmEntity,
        join: {
          from: `${InnopayCardOrmEntity.tableName}.id`,
          to: `${ContractOrmEntity.tableName}.tenantInnopayCardId`,
        },
      },
    };
  };
}
