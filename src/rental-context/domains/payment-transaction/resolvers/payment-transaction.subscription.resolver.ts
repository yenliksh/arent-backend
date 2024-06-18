import { PubSubService, PubSubTrigger } from '@modules/graphql-subscriptions/pub-sub.service';
import { PaymentTransactionPubSubPayload } from '@modules/graphql-subscriptions/types';
import { Resolver, Subscription } from '@nestjs/graphql';

import { PaymentTransactionSubscriptionResponse } from '../dtos/payment-transaction.subscription.response.dto';

@Resolver()
export class PaymentTransactionSubscriptionResolver {
  constructor(private readonly pubSubService: PubSubService) {}

  @Subscription(() => PaymentTransactionSubscriptionResponse, {
    name: PubSubTrigger.UPDATE_PAYMENT_TRANSACTION,
    filter: (payload: PaymentTransactionPubSubPayload, _, context) => payload.cardOwnerId === context.user.id,
    resolve: (payload: PaymentTransactionPubSubPayload) =>
      PaymentTransactionSubscriptionResponse.create(payload.paymentTransaction, payload.event),
  })
  paymentTransaction() {
    return this.pubSubService.asyncIterator(PubSubTrigger.UPDATE_PAYMENT_TRANSACTION);
  }
}
