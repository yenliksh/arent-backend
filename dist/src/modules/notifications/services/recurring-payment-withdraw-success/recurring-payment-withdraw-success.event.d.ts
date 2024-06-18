import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { NotificationEventTypes } from '../../types';
export declare class RecurringPaymentWithdrawSuccessEvent {
    recipientId: UUID;
    contractId: UUID;
    paymentTransactionId: UUID;
    static eventName: NotificationEventTypes;
    static create(props: RecurringPaymentWithdrawSuccessEvent): RecurringPaymentWithdrawSuccessEvent;
}
