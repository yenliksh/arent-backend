export declare type DomainEventProps<T> = Omit<T, 'id' | 'correlationId' | 'dateOccurred'> & Omit<DomainEvent, 'id' | 'correlationId' | 'dateOccurred'> & {
    correlationId?: string;
    dateOccurred?: number;
};
export declare abstract class DomainEvent {
    readonly id: string;
    readonly aggregateId: string;
    readonly dateOccurred: number;
    correlationId: string;
    causationId?: string;
    constructor(props: DomainEventProps<unknown>);
}
