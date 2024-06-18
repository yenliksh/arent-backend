import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';
import { ShortTermRentOrmEntity } from './short-term-rent.orm-entity';
export declare class ShortTermRentLockedDateOrmEntity extends ObjectionEntityBase {
    static create(data: Omit<ShortTermRentLockedDateOrmEntity, keyof Model>): ShortTermRentLockedDateOrmEntity;
    static tableName: string;
    shortTermRentId: string;
    startDate: string;
    endDate: string;
    shortTermRent?: ShortTermRentOrmEntity;
    static relationMappings: RelationMappingsThunk;
}
