import { SystemMessageProps } from '@domains/message/domain/value-objects/system-message.value-object';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

export class PushSystemMessageCommand {
  public constructor(
    public readonly messageProps: { chatId: UUID; senderId: UUID; content: SystemMessageProps },
    public readonly trxId?: TransactionId,
  ) {}
}
