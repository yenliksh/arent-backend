import {
  PaymentTransactionEntity,
  PaymentTransactionProps,
} from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

export interface PaymentTransactionRepositoryPort
  extends RepositoryPort<PaymentTransactionEntity, PaymentTransactionProps> {
  deleteByContractId(contractId: string, trxId?: TransactionId): Promise<void>;
  findActualCashInWaitingIds(trxId?: TransactionId): Promise<UUID[]>;
  findActualCashOutWaitingIds(trxId?: TransactionId): Promise<UUID[]>;
  findContractFirstPayment(contractId: string, trxId?: TransactionId): Promise<PaymentTransactionEntity | undefined>;
}
