import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ContractPubSubPayload, InnopayPageUrlPubSubPayload, MessagePubSubPayload, PaymentTransactionPubSubPayload } from './types';
export declare enum PubSubTrigger {
    UPDATE_CONTRACT = "updateContract",
    NEW_MESSAGE = "newMessage",
    UPDATE_PAYMENT_TRANSACTION = "updatePaymentTransaction",
    INNOPAY_PAGE_URL = "innopayPageUrl"
}
interface PayloadMap {
    [PubSubTrigger.UPDATE_CONTRACT]: ContractPubSubPayload;
    [PubSubTrigger.NEW_MESSAGE]: MessagePubSubPayload;
    [PubSubTrigger.UPDATE_PAYMENT_TRANSACTION]: PaymentTransactionPubSubPayload;
    [PubSubTrigger.INNOPAY_PAGE_URL]: InnopayPageUrlPubSubPayload;
}
export declare class PubSubService {
    private readonly redisPubSub;
    constructor(redisPubSub: RedisPubSub);
    publish<T extends PubSubTrigger>(triggerName: T, payload: PayloadMap[T]): Promise<void>;
    asyncIterator<T extends PubSubTrigger>(triggers: T): AsyncIterator<PayloadMap[T], any, undefined>;
}
export {};
