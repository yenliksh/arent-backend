import { ContractRequestEntity } from '@domains/contract-request/domain/entities/contract-request.entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';

export class CreateContractAfterRequestCommand {
  public constructor(public readonly contractRequest: ContractRequestEntity, public readonly trxId: TransactionId) {}
}
