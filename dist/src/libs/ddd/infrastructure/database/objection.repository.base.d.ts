import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Model } from 'objection';
import { OrmMapper } from './orm-mapper.base';
export declare abstract class ObjectionRepositoryBase<Entity extends AggregateRoot<unknown>, EntityProps, OrmEntity> {
    protected readonly mapper: OrmMapper<Entity, OrmEntity>;
    protected constructor(mapper: OrmMapper<Entity, OrmEntity>);
    protected abstract prepareQuery(params: QueryParams<EntityProps>): DeepPartial<Omit<OrmEntity, keyof Model>>;
}
