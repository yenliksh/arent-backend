import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

import { NotificationEventTypes } from '../../types';

export class PaymentTransferFailureEvent {
  recipientId: UUID;

  static eventName = NotificationEventTypes.PAYMENT_TRANSFER_FAILURE;

  static create(props: PaymentTransferFailureEvent) {
    const payload = new PaymentTransferFailureEvent();

    Object.assign(payload, props);

    return payload;
  }
}
