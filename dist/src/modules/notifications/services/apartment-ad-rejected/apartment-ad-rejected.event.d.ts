import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { NotificationEventTypes } from '@modules/notifications/types';
export declare class ApartmentAdRejectedEvent {
    recipientId: UUID;
    static eventName: NotificationEventTypes;
    static create(props: ApartmentAdRejectedEvent): ApartmentAdRejectedEvent;
}
