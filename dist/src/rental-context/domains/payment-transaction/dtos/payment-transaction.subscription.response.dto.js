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
var PaymentTransactionSubscriptionResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTransactionSubscriptionResponse = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../../../../modules/graphql-subscriptions/types");
const graphql_1 = require("@nestjs/graphql");
const payment_transaction_model_1 = require("../models/payment-transaction.model");
let PaymentTransactionSubscriptionResponse = PaymentTransactionSubscriptionResponse_1 = class PaymentTransactionSubscriptionResponse {
    static create(props, event) {
        const payload = new PaymentTransactionSubscriptionResponse_1();
        payload.paymentTransaction = payment_transaction_model_1.PaymentTransactionModel.create(props);
        payload.event = event;
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { paymentTransaction: { required: true, type: () => require("../models/payment-transaction.model").PaymentTransactionModel }, event: { required: true, enum: require("../../../../modules/graphql-subscriptions/types").PaymentTransactionPubSubEvent } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => payment_transaction_model_1.PaymentTransactionModel),
    __metadata("design:type", payment_transaction_model_1.PaymentTransactionModel)
], PaymentTransactionSubscriptionResponse.prototype, "paymentTransaction", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.PaymentTransactionPubSubEvent),
    __metadata("design:type", String)
], PaymentTransactionSubscriptionResponse.prototype, "event", void 0);
PaymentTransactionSubscriptionResponse = PaymentTransactionSubscriptionResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], PaymentTransactionSubscriptionResponse);
exports.PaymentTransactionSubscriptionResponse = PaymentTransactionSubscriptionResponse;
//# sourceMappingURL=payment-transaction.subscription.response.dto.js.map