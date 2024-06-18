import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model } from 'objection';
export declare class RentPeriodVersionOrmEntity extends ObjectionEntityBase {
    static create(data: Omit<RentPeriodVersionOrmEntity, keyof Model>): RentPeriodVersionOrmEntity;
    static tableName: string;
    version: number;
    shortTermRentMonth: number[];
    middleTermRentMonth: number[];
    longTermRentMonth: number[];
}
