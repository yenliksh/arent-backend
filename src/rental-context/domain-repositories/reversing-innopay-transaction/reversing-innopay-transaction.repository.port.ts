import {
  ReversingInnopayTransactionEntity,
  ReversingInnopayTransactionProps,
} from '@domains/innopay-transaction/domain/entities/reversing-innopay-transaction.entity';
import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';

export interface ReversingInnopayTransactionRepositoryPort
  extends RepositoryPort<ReversingInnopayTransactionEntity, ReversingInnopayTransactionProps> {
  findByCustomerReference(customerReference: string): Promise<ReversingInnopayTransactionEntity | undefined>;
}
