import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

import { NotificationEventTypes } from '../../types';

export class BookingRequestSentEvent {
  recipientId: UUID;

  static eventName = NotificationEventTypes.BOOKING_REQUEST_SENT;

  static create(props: BookingRequestSentEvent) {
    const payload = new BookingRequestSentEvent();

    Object.assign(payload, props);

    return payload;
  }
}
