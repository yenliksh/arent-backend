import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { NotificationEventTypes } from '../../types';
export declare class BookingRequestStatusChangedEvent {
    recipientId: UUID;
    static eventName: NotificationEventTypes;
    static create(props: BookingRequestStatusChangedEvent): BookingRequestStatusChangedEvent;
}
