import {
  TemporaryPaymentTransactionEntity,
  TemporaryPaymentTransactionProps,
} from '@domains/temporary-payment-transaction/domain/entities/temporary-payment-transaction.entity';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';

export interface TemporaryPaymentTransactionRepositoryPort
  extends RepositoryPort<TemporaryPaymentTransactionEntity, TemporaryPaymentTransactionProps> {
  findByContractId(contractId: string, trxId?: TransactionId): Promise<TemporaryPaymentTransactionEntity[]>;
}
