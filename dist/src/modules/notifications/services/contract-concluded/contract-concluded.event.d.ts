import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { NotificationEventTypes } from '../../types';
export declare class ContractConcludedEvent {
    tenantId: UUID;
    landlordId: UUID;
    contractId: UUID;
    chatId: UUID;
    paymentTransactionId: UUID;
    static eventName: NotificationEventTypes;
    static create(props: ContractConcludedEvent): ContractConcludedEvent;
}
