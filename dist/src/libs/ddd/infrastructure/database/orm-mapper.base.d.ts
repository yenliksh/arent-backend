import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { CreateEntityProps } from '@libs/ddd/domain/base-classes/entity.base';
import { ID } from '@libs/ddd/domain/value-objects/id.value-object';
import { Model } from 'objection';
export declare type OrmEntityProps<OrmEntity> = Omit<OrmEntity, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'properties' | keyof Model>;
export interface EntityProps<EntityProps> {
    id: ID;
    props: EntityProps;
}
export declare abstract class OrmMapper<Entity extends AggregateRoot<unknown>, OrmEntity> {
    private entityConstructor;
    protected readonly unitOfWork?: UnitOfWork | undefined;
    constructor(entityConstructor: new (props: CreateEntityProps<any>) => Entity, unitOfWork?: UnitOfWork | undefined);
    protected abstract toDomainProps(ormEntity: OrmEntity, trxId?: TransactionId): Promise<EntityProps<unknown>>;
    protected abstract toOrmProps(entity: Entity, trxId?: TransactionId): Promise<OrmEntityProps<OrmEntity>>;
    toDomainEntity(ormEntity: OrmEntity, trxId?: TransactionId): Promise<Entity>;
    toOrmEntity(entity: Entity, trxId?: TransactionId): Promise<OrmEntity>;
}
