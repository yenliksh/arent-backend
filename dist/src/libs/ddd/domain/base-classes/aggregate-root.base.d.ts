import { DomainEvent } from '../domain-events/domain-event.base';
import { Entity } from './entity.base';
export declare abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
    private _domainEvents;
    get domainEvents(): DomainEvent[];
    protected addEvent(domainEvent: DomainEvent): void;
    clearEvents(): void;
}
