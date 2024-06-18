import { RedisService } from '@third-parties/cloud-cache-storage/src';
import { RedisPubSub } from 'graphql-redis-subscriptions';
export declare const redisPubSubFactory: {
    provide: string;
    useFactory: (redisService: RedisService) => RedisPubSub;
    inject: (typeof RedisService)[];
};
