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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTransactionSubscriptionResolver = void 0;
const pub_sub_service_1 = require("../../../../modules/graphql-subscriptions/pub-sub.service");
const graphql_1 = require("@nestjs/graphql");
const payment_transaction_subscription_response_dto_1 = require("../dtos/payment-transaction.subscription.response.dto");
let PaymentTransactionSubscriptionResolver = class PaymentTransactionSubscriptionResolver {
    constructor(pubSubService) {
        this.pubSubService = pubSubService;
    }
    paymentTransaction() {
        return this.pubSubService.asyncIterator(pub_sub_service_1.PubSubTrigger.UPDATE_PAYMENT_TRANSACTION);
    }
};
__decorate([
    (0, graphql_1.Subscription)(() => payment_transaction_subscription_response_dto_1.PaymentTransactionSubscriptionResponse, {
        name: pub_sub_service_1.PubSubTrigger.UPDATE_PAYMENT_TRANSACTION,
        filter: (payload, _, context) => payload.cardOwnerId === context.user.id,
        resolve: (payload) => payment_transaction_subscription_response_dto_1.PaymentTransactionSubscriptionResponse.create(payload.paymentTransaction, payload.event),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaymentTransactionSubscriptionResolver.prototype, "paymentTransaction", null);
PaymentTransactionSubscriptionResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [pub_sub_service_1.PubSubService])
], PaymentTransactionSubscriptionResolver);
exports.PaymentTransactionSubscriptionResolver = PaymentTransactionSubscriptionResolver;
//# sourceMappingURL=payment-transaction.subscription.resolver.js.map