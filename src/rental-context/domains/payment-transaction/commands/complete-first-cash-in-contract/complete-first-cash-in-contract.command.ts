import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

export class CompleteFirstCashInContractCommand {
  public constructor(public readonly contractId: UUID, public readonly customerReference: string) {}
}
