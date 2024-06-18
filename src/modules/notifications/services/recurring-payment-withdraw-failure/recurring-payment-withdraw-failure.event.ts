import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

import { NotificationEventTypes } from '../../types';

export class RecurringPaymentWithdrawFailureEvent {
  recipientId: UUID;

  static eventName = NotificationEventTypes.RECURRING_PAYMENT_WITHDRAW_FAILURE;

  static create(props: RecurringPaymentWithdrawFailureEvent) {
    const payload = new RecurringPaymentWithdrawFailureEvent();

    Object.assign(payload, props);

    return payload;
  }
}
