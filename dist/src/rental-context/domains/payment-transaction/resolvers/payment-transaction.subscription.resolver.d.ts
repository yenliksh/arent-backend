import { PubSubService } from '@modules/graphql-subscriptions/pub-sub.service';
import { PaymentTransactionPubSubPayload } from '@modules/graphql-subscriptions/types';
export declare class PaymentTransactionSubscriptionResolver {
    private readonly pubSubService;
    constructor(pubSubService: PubSubService);
    paymentTransaction(): AsyncIterator<PaymentTransactionPubSubPayload, any, undefined>;
}
