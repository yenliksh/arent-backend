import { LongTermRentCancellationPolicyType } from '@infrastructure/enums';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';

import { ApartmentAdStatusType, CurrencyType } from '../../../rental-context/domains/apartment-ad/domain/types';
import { ApartmentAdOrmEntity } from './apartment-ad.orm-entity';

export class LongTermRentOrmEntity extends ObjectionEntityBase {
  static create(data: Omit<LongTermRentOrmEntity, keyof Model>) {
    return LongTermRentOrmEntity.fromJson(data);
  }

  static tableName = 'long_term_rents';

  cost: number;
  currency: CurrencyType;
  apartmentAdId: string;
  status: ApartmentAdStatusType[];
  isApproved: boolean;
  declineReason?: string | null;
  ownershipDocuments?: string[];
  cancellationPolicy?: LongTermRentCancellationPolicyType;

  apartmentAd?: ApartmentAdOrmEntity;

  static relationMappings: RelationMappingsThunk = () => {
    return {
      apartmentAd: {
        relation: Model.BelongsToOneRelation,
        modelClass: ApartmentAdOrmEntity,
        join: {
          from: `${LongTermRentOrmEntity.tableName}.apartmentAdId`,
          to: `${ApartmentAdOrmEntity.tableName}.id`,
        },
      },
    };
  };
}
