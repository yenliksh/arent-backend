import { DomainEvent } from './domain-event.base';
import { DomainEventClass } from './domain-events';
export declare abstract class DomainEventHandler {
    private readonly event;
    constructor(event: DomainEventClass);
    abstract handle(event: DomainEvent): Promise<void>;
    listen(): void;
}
