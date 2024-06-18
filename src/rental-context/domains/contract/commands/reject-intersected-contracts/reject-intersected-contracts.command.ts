import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

export class RejectIntersectedContractsCommand {
  public constructor(public readonly concludedContractId: UUID) {}
}
