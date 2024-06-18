import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { PaymentTransactionPubSubEvent } from '@modules/graphql-subscriptions/types';
import { PaymentTransactionModel } from '../models/payment-transaction.model';
export declare class PaymentTransactionSubscriptionResponse {
    paymentTransaction: PaymentTransactionModel;
    event: PaymentTransactionPubSubEvent;
    static create(props: PaymentTransactionOrmEntity, event: PaymentTransactionPubSubEvent): PaymentTransactionSubscriptionResponse;
}
