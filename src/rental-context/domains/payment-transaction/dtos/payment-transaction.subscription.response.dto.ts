import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { PaymentTransactionPubSubEvent } from '@modules/graphql-subscriptions/types';
import { Field, ObjectType } from '@nestjs/graphql';

import { PaymentTransactionModel } from '../models/payment-transaction.model';

@ObjectType()
export class PaymentTransactionSubscriptionResponse {
  @Field(() => PaymentTransactionModel)
  paymentTransaction: PaymentTransactionModel;

  @Field(() => PaymentTransactionPubSubEvent)
  event: PaymentTransactionPubSubEvent;

  static create(props: PaymentTransactionOrmEntity, event: PaymentTransactionPubSubEvent) {
    const payload = new PaymentTransactionSubscriptionResponse();

    payload.paymentTransaction = PaymentTransactionModel.create(props);
    payload.event = event;

    return payload;
  }
}
