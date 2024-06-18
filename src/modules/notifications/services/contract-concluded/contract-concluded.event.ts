import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

import { NotificationEventTypes } from '../../types';

export class ContractConcludedEvent {
  tenantId: UUID;
  landlordId: UUID;
  contractId: UUID;
  chatId: UUID;
  paymentTransactionId: UUID;

  static eventName = NotificationEventTypes.CONTRACT_CONCLUDED;

  static create(props: ContractConcludedEvent) {
    const payload = new ContractConcludedEvent();

    Object.assign(payload, props);

    return payload;
  }
}
