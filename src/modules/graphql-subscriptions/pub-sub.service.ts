import { redisPubSubFactory } from '@infrastructure/configs/redis-pub-sub.factory';
import { Inject, Injectable } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import {
  ContractPubSubPayload,
  InnopayPageUrlPubSubPayload,
  MessagePubSubPayload,
  PaymentTransactionPubSubPayload,
} from './types';

export enum PubSubTrigger {
  UPDATE_CONTRACT = 'updateContract',
  NEW_MESSAGE = 'newMessage',
  UPDATE_PAYMENT_TRANSACTION = 'updatePaymentTransaction',
  INNOPAY_PAGE_URL = 'innopayPageUrl',
}

interface PayloadMap {
  [PubSubTrigger.UPDATE_CONTRACT]: ContractPubSubPayload;
  [PubSubTrigger.NEW_MESSAGE]: MessagePubSubPayload;
  [PubSubTrigger.UPDATE_PAYMENT_TRANSACTION]: PaymentTransactionPubSubPayload;
  [PubSubTrigger.INNOPAY_PAGE_URL]: InnopayPageUrlPubSubPayload;
}

@Injectable()
export class PubSubService {
  constructor(
    @Inject(redisPubSubFactory.provide)
    private readonly redisPubSub: RedisPubSub,
  ) {}

  publish<T extends PubSubTrigger>(triggerName: T, payload: PayloadMap[T]) {
    return this.redisPubSub.publish(triggerName, payload);
  }

  asyncIterator<T extends PubSubTrigger>(triggers: T) {
    return this.redisPubSub.asyncIterator<PayloadMap[T]>(triggers);
  }
}
