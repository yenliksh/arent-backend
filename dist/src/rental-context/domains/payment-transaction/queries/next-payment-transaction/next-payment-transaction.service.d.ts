import { PaymentHistorySearchType } from '@domains/payment-transaction/types';
import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { Ok } from 'oxide.ts';
export declare class NextPaymentTransactionService {
    handle(userId: UUID, paymentSearchType: PaymentHistorySearchType): Promise<Ok<PaymentTransactionOrmEntity[]>>;
}
