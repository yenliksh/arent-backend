import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { NotificationEventTypes } from '../../types';
export declare class ContractOfferStatusChangedEvent {
    recipientId: UUID;
    isLandLord?: boolean;
    static eventName: NotificationEventTypes;
    static create(props: ContractOfferStatusChangedEvent): ContractOfferStatusChangedEvent;
}
