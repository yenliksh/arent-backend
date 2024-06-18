import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

import { NotificationEventTypes } from '../../types';

export class RecurringPaymentLastWithdrawFailureEvent {
  recipientId: UUID;
  contractId: UUID;

  static eventName = NotificationEventTypes.RECURRING_PAYMENT_LAST_WITHDRAW_FAILURE;

  static create(props: RecurringPaymentLastWithdrawFailureEvent) {
    const payload = new RecurringPaymentLastWithdrawFailureEvent();

    Object.assign(payload, props);

    return payload;
  }
}
