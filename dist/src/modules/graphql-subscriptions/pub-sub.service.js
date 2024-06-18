"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubService = exports.PubSubTrigger = void 0;
const redis_pub_sub_factory_1 = require("../../infrastructure/configs/redis-pub-sub.factory");
const common_1 = require("@nestjs/common");
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
var PubSubTrigger;
(function (PubSubTrigger) {
    PubSubTrigger["UPDATE_CONTRACT"] = "updateContract";
    PubSubTrigger["NEW_MESSAGE"] = "newMessage";
    PubSubTrigger["UPDATE_PAYMENT_TRANSACTION"] = "updatePaymentTransaction";
    PubSubTrigger["INNOPAY_PAGE_URL"] = "innopayPageUrl";
})(PubSubTrigger = exports.PubSubTrigger || (exports.PubSubTrigger = {}));
let PubSubService = class PubSubService {
    constructor(redisPubSub) {
        this.redisPubSub = redisPubSub;
    }
    publish(triggerName, payload) {
        return this.redisPubSub.publish(triggerName, payload);
    }
    asyncIterator(triggers) {
        return this.redisPubSub.asyncIterator(triggers);
    }
};
PubSubService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(redis_pub_sub_factory_1.redisPubSubFactory.provide)),
    __metadata("design:paramtypes", [graphql_redis_subscriptions_1.RedisPubSub])
], PubSubService);
exports.PubSubService = PubSubService;
//# sourceMappingURL=pub-sub.service.js.map