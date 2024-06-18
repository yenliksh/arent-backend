import { DateVO } from '../value-objects/date.value-object';
import { ID } from '../value-objects/id.value-object';
export interface BaseEntityProps {
    id: ID;
    createdAt: DateVO;
    updatedAt: DateVO;
    deletedAt: DateVO | null;
}
export interface CreateEntityProps<T> {
    id: ID;
    props: T;
    createdAt?: DateVO;
    updatedAt?: DateVO;
    deletedAt?: DateVO | null;
}
export declare abstract class Entity<EntityProps> {
    constructor({ id, createdAt, props }: CreateEntityProps<EntityProps>);
    protected readonly props: EntityProps;
    protected abstract _id: ID;
    private readonly _createdAt;
    private _updatedAt;
    private _deletedAt;
    get id(): ID;
    private setId;
    get createdAt(): DateVO;
    get updatedAt(): DateVO;
    get deletedAt(): DateVO | null;
    static isEntity(entity: unknown): entity is Entity<unknown>;
    equals(object?: Entity<EntityProps>): boolean;
    getPropsCopy(): EntityProps & BaseEntityProps;
    toObject(): unknown;
    abstract validate(): void;
    private validateProps;
}
