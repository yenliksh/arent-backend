import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

export class AddChargeOffCardCommand {
  public constructor(
    public readonly props: {
      userId: UUID;
      cnpUserId: number;
      cnpCardId: number;
      customerReference: string;
    },
    public readonly trxId?: TransactionId,
  ) {}
}
