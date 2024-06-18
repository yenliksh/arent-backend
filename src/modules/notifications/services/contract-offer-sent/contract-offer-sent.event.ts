import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

import { NotificationEventTypes } from '../../types';

export class ContractOfferSentEvent {
  recipientId: UUID;

  static eventName = NotificationEventTypes.CONTRACT_OFFER_SENT;

  static create(props: ContractOfferSentEvent) {
    const payload = new ContractOfferSentEvent();

    Object.assign(payload, props);

    return payload;
  }
}
