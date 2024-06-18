import { RedisService } from '@third-parties/cloud-cache-storage/src';
import { isISO8601 } from 'class-validator';
import { RedisPubSub } from 'graphql-redis-subscriptions';

const dateReviver = (key: any, value: any) => {
  if (typeof value === 'string' && isISO8601(value)) {
    const tempDateNumber = Date.parse(value);
    if (!isNaN(tempDateNumber)) {
      return new Date(tempDateNumber);
    }
  }
  return value;
};

export const redisPubSubFactory = {
  provide: 'PUB_SUB',
  useFactory: (redisService: RedisService) => {
    return new RedisPubSub({
      publisher: redisService.client,
      subscriber: redisService.clientForSubscriberMode,
      reviver: dateReviver,
    });
  },
  inject: [RedisService],
};
