import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model } from 'objection';

export class RentPeriodVersionOrmEntity extends ObjectionEntityBase {
  static create(data: Omit<RentPeriodVersionOrmEntity, keyof Model>) {
    return RentPeriodVersionOrmEntity.fromJson(data);
  }

  static tableName = 'rent_period_versions';

  version: number;
  shortTermRentMonth: number[];
  middleTermRentMonth: number[];
  longTermRentMonth: number[];
}
