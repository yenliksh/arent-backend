import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model } from 'objection';
export declare class ReversingInnopayTransactionOrmEntity extends ObjectionEntityBase {
    static create(data: Omit<ReversingInnopayTransactionOrmEntity, keyof Model>): ReversingInnopayTransactionOrmEntity;
    static tableName: string;
    customerReference: string;
    isReversed: boolean;
}
