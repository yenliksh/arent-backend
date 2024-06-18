import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

export class UpdateLastOfferMessageCommand {
  public constructor(public readonly chatId: UUID, public readonly trxId?: TransactionId) {}
}
