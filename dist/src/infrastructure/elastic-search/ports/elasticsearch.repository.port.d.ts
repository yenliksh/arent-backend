import { Entity } from '@libs/ddd/domain/base-classes/entity.base';
export interface Save<Entity> {
    save(entity: Entity): Promise<string>;
}
export interface DeleteOne<Entity> {
    delete(entity: Entity): Promise<string>;
}
export interface ElasticsearchRepositoryPort<DomainEntity extends Entity<unknown>> extends Save<DomainEntity>, DeleteOne<DomainEntity> {
}
