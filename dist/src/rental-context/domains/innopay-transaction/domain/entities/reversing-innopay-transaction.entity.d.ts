import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
export interface CreateReversingInnopayTransactionProps {
    customerReference: string;
}
export interface ReversingInnopayTransactionProps extends CreateReversingInnopayTransactionProps {
    isReversed: boolean;
}
export declare class ReversingInnopayTransactionEntity extends AggregateRoot<ReversingInnopayTransactionProps> {
    protected readonly _id: UUID;
    static create({ customerReference }: CreateReversingInnopayTransactionProps): ReversingInnopayTransactionEntity;
    reverse(): void;
    get id(): UUID;
    get customerReference(): string;
    validate(): void;
}
