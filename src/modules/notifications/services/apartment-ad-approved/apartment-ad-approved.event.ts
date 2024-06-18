import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

import { NotificationEventTypes } from '../../types';

export class ApartmentAdApprovedEvent {
  recipientId: UUID;

  static eventName = NotificationEventTypes.APARTMENT_AD_APPROVED;

  static create(props: ApartmentAdApprovedEvent) {
    const payload = new ApartmentAdApprovedEvent();

    Object.assign(payload, props);

    return payload;
  }
}
