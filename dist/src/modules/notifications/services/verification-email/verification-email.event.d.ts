import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { NotificationEventTypes } from '../../types';
export declare class VerificationEmailEvent {
    recipientId: UUID;
    token: string;
    static eventName: NotificationEventTypes;
    static create(props: VerificationEmailEvent): VerificationEmailEvent;
}
