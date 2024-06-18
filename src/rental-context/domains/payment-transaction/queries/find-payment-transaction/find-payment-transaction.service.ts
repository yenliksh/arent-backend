import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';

@Injectable()
export class FindPaymentTransactionService {
  async handle(id: UUID, userId: UUID): Promise<Result<PaymentTransactionOrmEntity, NotFoundException>> {
    const paymentTransaction = await PaymentTransactionOrmEntity.query()
      .innerJoinRelated({ contract: true })
      .where('contract.tenantId', userId.value)
      .findById(id.value);

    if (!paymentTransaction) {
      return Err(new NotFoundException('Payment transaction not found'));
    }

    return Ok(paymentTransaction);
  }
}
