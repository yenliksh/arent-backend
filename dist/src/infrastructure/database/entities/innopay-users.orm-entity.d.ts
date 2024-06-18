import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';
import { InnopayCardOrmEntity } from './innopay-card.orm-entity';
export declare class InnopayUsersOrmEntity extends ObjectionEntityBase {
    static create(data: Omit<InnopayUsersOrmEntity, keyof Model>): InnopayUsersOrmEntity;
    static tableName: string;
    id: string;
    userId: string;
    cnpUserId: number;
    isCrediting: boolean;
    cards?: InnopayCardOrmEntity[];
    static relationMappings: RelationMappingsThunk;
}
