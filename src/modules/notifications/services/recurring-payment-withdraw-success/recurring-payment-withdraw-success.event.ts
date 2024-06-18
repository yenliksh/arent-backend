import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

import { NotificationEventTypes } from '../../types';

export class RecurringPaymentWithdrawSuccessEvent {
  recipientId: UUID;
  contractId: UUID;
  paymentTransactionId: UUID;

  static eventName = NotificationEventTypes.RECURRING_PAYMENT_WITHDRAW_SUCCESS;

  static create(props: RecurringPaymentWithdrawSuccessEvent) {
    const payload = new RecurringPaymentWithdrawSuccessEvent();

    Object.assign(payload, props);

    return payload;
  }
}
