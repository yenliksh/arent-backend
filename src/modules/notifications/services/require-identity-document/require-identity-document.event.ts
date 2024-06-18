import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

import { NotificationEventTypes } from '../../types';

export class RequireIdentityDocumentEvent {
  recipientId: UUID;

  static eventName = NotificationEventTypes.REQUIRE_IDENTITY_DOCUMENT;

  static create(props: RequireIdentityDocumentEvent) {
    const payload = new RequireIdentityDocumentEvent();

    Object.assign(payload, props);

    return payload;
  }
}
