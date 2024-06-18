import { AggregateRoot } from '../base-classes/aggregate-root.base';
import { Logger } from '../ports/logger.port';
import { ID } from '../value-objects/id.value-object';
import { DomainEventHandler } from './domain-event-handler.base';
import { DomainEvent } from './domain-event.base';
export declare type DomainEventClass = new (...args: never[]) => DomainEvent;
export declare class DomainEvents {
    private static subscribers;
    private static aggregates;
    static subscribe<T extends DomainEventHandler>(event: DomainEventClass, eventHandler: T): void;
    static prepareForPublish(aggregate: AggregateRoot<unknown>): void;
    static publishEvents(id: ID, logger: Logger, correlationId?: string): Promise<void>;
    private static findAggregateByID;
    private static removeAggregateFromPublishList;
    private static publish;
}
