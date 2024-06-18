import { PaymentTransactionEntity } from '../entities/payment-transaction.entity';
import { PaymentTransactionEvents } from './types';

export class CashInFailedEvent {
  paymentTransaction: PaymentTransactionEntity;

  static eventName = PaymentTransactionEvents.CASH_IN_FAILED;

  static create(props: CashInFailedEvent) {
    const payload = new CashInFailedEvent();

    Object.assign(payload, props);

    return payload;
  }
}
