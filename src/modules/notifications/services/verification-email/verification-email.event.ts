import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

import { NotificationEventTypes } from '../../types';

export class VerificationEmailEvent {
  recipientId: UUID;
  token: string;

  static eventName = NotificationEventTypes.VERIFICATION_EMAIL;

  static create(props: VerificationEmailEvent) {
    const payload = new VerificationEmailEvent();

    Object.assign(payload, props);

    return payload;
  }
}
