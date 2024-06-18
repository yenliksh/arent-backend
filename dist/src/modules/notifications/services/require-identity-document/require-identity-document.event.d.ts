import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { NotificationEventTypes } from '../../types';
export declare class RequireIdentityDocumentEvent {
    recipientId: UUID;
    static eventName: NotificationEventTypes;
    static create(props: RequireIdentityDocumentEvent): RequireIdentityDocumentEvent;
}
