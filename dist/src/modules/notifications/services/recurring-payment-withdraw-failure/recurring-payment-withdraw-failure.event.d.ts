import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { NotificationEventTypes } from '../../types';
export declare class RecurringPaymentWithdrawFailureEvent {
    recipientId: UUID;
    static eventName: NotificationEventTypes;
    static create(props: RecurringPaymentWithdrawFailureEvent): RecurringPaymentWithdrawFailureEvent;
}
