import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

@Injectable()
export class PaymentTransactionOrmEntityLoader
  implements NestDataLoader<PaymentTransactionOrmEntity['id'], PaymentTransactionOrmEntity | undefined>
{
  generateDataLoader(): DataLoader<PaymentTransactionOrmEntity['id'], PaymentTransactionOrmEntity | undefined> {
    return new DataLoader<string, PaymentTransactionOrmEntity | undefined>(async (paymentTransactionIds) => {
      const paymentTransactions = await PaymentTransactionOrmEntity.query().findByIds(
        paymentTransactionIds as string[],
      );
      return paymentTransactionIds.map((id) =>
        paymentTransactions.find((paymentTransaction) => paymentTransaction.id === id),
      );
    });
  }
}
