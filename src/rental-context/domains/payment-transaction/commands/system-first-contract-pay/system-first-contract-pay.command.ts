import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

export class SystemFirstContractPayCommand {
  public constructor(public readonly contractId: UUID) {}
}
