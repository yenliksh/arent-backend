import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

import { NotificationEventTypes } from '../../types';

export class BookingRequestStatusChangedEvent {
  recipientId: UUID;

  static eventName = NotificationEventTypes.BOOKING_REQUEST_STATUS_CHANGED;

  static create(props: BookingRequestStatusChangedEvent) {
    const payload = new BookingRequestStatusChangedEvent();

    Object.assign(payload, props);

    return payload;
  }
}
