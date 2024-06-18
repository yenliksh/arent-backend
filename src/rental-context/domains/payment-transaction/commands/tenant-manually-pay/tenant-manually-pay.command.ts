import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

export class TenantManuallyPayCommand {
  public constructor(public readonly paymentTransactionId: UUID, public readonly userId: UUID) {}
}
