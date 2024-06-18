import { ShortTermRentBookingType, ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';
import { ApartmentAdStatusType, CurrencyType } from 'src/rental-context/domains/apartment-ad/domain/types';

import { ApartmentAdOrmEntity } from './apartment-ad.orm-entity';
import { ShortTermRentLockedDateOrmEntity } from './short-term-rent-locked-dates.orm-entity';

export class ShortTermRentOrmEntity extends ObjectionEntityBase {
  static create(data: Omit<ShortTermRentOrmEntity, keyof Model>) {
    return ShortTermRentOrmEntity.fromJson(data);
  }

  static tableName = 'short_term_rents';

  cost: number;
  currency: CurrencyType;
  apartmentAdId: string;
  rentBookingType: ShortTermRentBookingType;
  status: ApartmentAdStatusType[];
  isApproved: boolean;
  declineReason?: string | null;
  cancellationPolicy?: ShortTermRentCancellationPolicyType;
  arrivalTime?: string;
  departureTime?: string;

  bookingAccessInMonths?: number;

  apartmentAd?: ApartmentAdOrmEntity;
  lockedDates?: ShortTermRentLockedDateOrmEntity[];

  static relationMappings: RelationMappingsThunk = () => {
    return {
      apartmentAd: {
        relation: Model.BelongsToOneRelation,
        modelClass: ApartmentAdOrmEntity,
        join: {
          from: `${ShortTermRentOrmEntity.tableName}.apartmentAdId`,
          to: `${ApartmentAdOrmEntity.tableName}.id`,
        },
      },
      lockedDates: {
        relation: Model.HasManyRelation,
        modelClass: ShortTermRentLockedDateOrmEntity,
        join: {
          from: `${ShortTermRentOrmEntity.tableName}.id`,
          to: `${ShortTermRentLockedDateOrmEntity.tableName}.shortTermRentId`,
        },
      },
    };
  };
}
