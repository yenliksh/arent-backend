import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import * as DataLoader from 'dataloader';
export declare class PaymentTransactionOrmEntityLoader implements NestDataLoader<PaymentTransactionOrmEntity['id'], PaymentTransactionOrmEntity | undefined> {
    generateDataLoader(): DataLoader<PaymentTransactionOrmEntity['id'], PaymentTransactionOrmEntity | undefined>;
}
