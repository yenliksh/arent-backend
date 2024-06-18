import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { NotificationEventTypes } from '@modules/notifications/types';

export class ApartmentAdRejectedEvent {
  recipientId: UUID;

  static eventName = NotificationEventTypes.APARTMENT_AD_REJECTED;

  static create(props: ApartmentAdRejectedEvent) {
    const payload = new ApartmentAdRejectedEvent();

    Object.assign(payload, props);

    return payload;
  }
}
