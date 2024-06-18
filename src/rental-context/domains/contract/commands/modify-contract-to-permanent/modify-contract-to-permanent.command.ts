import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

// modify temporary contract to permanent (usual) contract
export class ModifyContractToPermanentCommand {
  public constructor(
    public readonly contractId: UUID,
    public readonly cardProps: {
      cnpCardId: number;
      cnpUserId: number;
    },
    public readonly trxId?: TransactionId,
  ) {}
}
