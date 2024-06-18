import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

import { NotificationEventTypes } from '../../types';

export class PaymentTransferSuccessEvent {
  recipientId: UUID;

  static eventName = NotificationEventTypes.PAYMENT_TRANSFER_SUCCESS;

  static create(props: PaymentTransferSuccessEvent) {
    const payload = new PaymentTransferSuccessEvent();

    Object.assign(payload, props);

    return payload;
  }
}
