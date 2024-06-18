import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model } from 'objection';

export class ReversingInnopayTransactionOrmEntity extends ObjectionEntityBase {
  static create(data: Omit<ReversingInnopayTransactionOrmEntity, keyof Model>) {
    return ReversingInnopayTransactionOrmEntity.fromJson(data);
  }

  static tableName = 'reversing_innopay_transactions';

  customerReference: string;
  isReversed: boolean;
}
