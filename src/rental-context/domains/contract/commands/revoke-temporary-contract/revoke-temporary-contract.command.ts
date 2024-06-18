import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

export class RevokeTemporaryContractCommand {
  public constructor(public readonly contractId: UUID) {}
}
