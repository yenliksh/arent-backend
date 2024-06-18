import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { NotFoundException } from '@nestjs/common';
import { Result } from 'oxide.ts';
export declare class FindPaymentTransactionService {
    handle(id: UUID, userId: UUID): Promise<Result<PaymentTransactionOrmEntity, NotFoundException>>;
}
