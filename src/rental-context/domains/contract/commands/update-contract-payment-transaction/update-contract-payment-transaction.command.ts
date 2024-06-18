import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

export class UpdateContractPaymentTransactionCommand {
  public constructor(public readonly contractId: UUID, public readonly trxId?: TransactionId) {}
}
