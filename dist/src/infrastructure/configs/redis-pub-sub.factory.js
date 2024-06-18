"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisPubSubFactory = void 0;
const src_1 = require("../../third-parties/cloud-cache-storage/src");
const class_validator_1 = require("class-validator");
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
const dateReviver = (key, value) => {
    if (typeof value === 'string' && (0, class_validator_1.isISO8601)(value)) {
        const tempDateNumber = Date.parse(value);
        if (!isNaN(tempDateNumber)) {
            return new Date(tempDateNumber);
        }
    }
    return value;
};
exports.redisPubSubFactory = {
    provide: 'PUB_SUB',
    useFactory: (redisService) => {
        return new graphql_redis_subscriptions_1.RedisPubSub({
            publisher: redisService.client,
            subscriber: redisService.clientForSubscriberMode,
            reviver: dateReviver,
        });
    },
    inject: [src_1.RedisService],
};
//# sourceMappingURL=redis-pub-sub.factory.js.map