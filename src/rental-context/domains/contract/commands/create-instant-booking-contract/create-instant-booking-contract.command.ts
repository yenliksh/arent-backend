import { ContractRequestEntity } from '@domains/contract-request/domain/entities/contract-request.entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

export class CreateInstantContractCommand {
  public constructor(
    public readonly contractRequest: ContractRequestEntity,
    public readonly cardId: UUID,
    public readonly trxId?: TransactionId,
  ) {}
}
