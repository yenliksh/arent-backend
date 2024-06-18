import { PaymentInvoiceModel } from '@domains/payment-transaction/models/payment-invoice.model';
import { PaymentTransactionModel } from '@domains/payment-transaction/models/payment-transaction.model';
import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import DataLoader from 'dataloader';
export declare class PaymentInvoiceResolver {
    paymentTransaction(paymentInvoice: PaymentInvoiceModel, loader: DataLoader<string, PaymentTransactionOrmEntity | undefined>): Promise<PaymentTransactionModel>;
}
