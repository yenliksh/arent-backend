import { SystemMessageType } from '@domains/message/domain/types';
import { PaymentTransactionMeta } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

export class CreateChatCommand {
  public constructor(
    public readonly props: {
      contractId: UUID;
      systemMessageType: SystemMessageType;
      transactionsMeta: PaymentTransactionMeta[];
    },
    public readonly trxId?: TransactionId,
  ) {}
}
