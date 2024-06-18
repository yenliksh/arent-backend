import { PaymentTransactionEntity } from '../entities/payment-transaction.entity';
import { PaymentTransactionEvents } from './types';
export declare class CashInFailedEvent {
    paymentTransaction: PaymentTransactionEntity;
    static eventName: PaymentTransactionEvents;
    static create(props: CashInFailedEvent): CashInFailedEvent;
}
