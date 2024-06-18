import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

import { NotificationEventTypes } from '../../types';

export class ContractOfferStatusChangedEvent {
  recipientId: UUID;
  isLandLord?: boolean;

  static eventName = NotificationEventTypes.CONTRACT_OFFER_STATUS_CHANGED;

  static create(props: ContractOfferStatusChangedEvent) {
    const payload = new ContractOfferStatusChangedEvent();

    Object.assign(payload, props);

    return payload;
  }
}
