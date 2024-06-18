import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { NotificationEventTypes } from '../../types';
export declare class RecurringPaymentLastWithdrawFailureEvent {
    recipientId: UUID;
    contractId: UUID;
    static eventName: NotificationEventTypes;
    static create(props: RecurringPaymentLastWithdrawFailureEvent): RecurringPaymentLastWithdrawFailureEvent;
}
