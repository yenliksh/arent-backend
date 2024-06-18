import { SystemMessageType } from '@domains/message/domain/types';
import { PaymentTransactionMeta } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
export declare class CreateChatCommand {
    readonly props: {
        contractId: UUID;
        systemMessageType: SystemMessageType;
        transactionsMeta: PaymentTransactionMeta[];
    };
    readonly trxId?: string | undefined;
    constructor(props: {
        contractId: UUID;
        systemMessageType: SystemMessageType;
        transactionsMeta: PaymentTransactionMeta[];
    }, trxId?: string | undefined);
}
