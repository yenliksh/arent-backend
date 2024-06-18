"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTransactionCronModule = void 0;
const rental_context_domain_repositories_module_1 = require("../../../domain-repositories/rental-context-domain-repositories.module");
const graphql_subscriptions_module_1 = require("../../../../modules/graphql-subscriptions/graphql-subscriptions.module");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const payment_bulls_module_1 = require("../bulls/payment-bulls.module");
const tenant_recurrent_pay_handler_1 = require("./commands/tenant-recurrent-pay/tenant-recurrent-pay.handler");
const transfer_money_to_receiver_handler_1 = require("./commands/transfer-money-to-receiver/transfer-money-to-receiver.handler");
const webhook_recurrent_payment_controller_1 = require("./controllers/webhook-recurrent-payment.controller");
const commands = [tenant_recurrent_pay_handler_1.TenantRecurrentPayHandler, transfer_money_to_receiver_handler_1.TransferMoneyToReceiverHandler];
const controllers = [webhook_recurrent_payment_controller_1.WebhookRecurrentPaymentController];
let PaymentTransactionCronModule = class PaymentTransactionCronModule {
};
PaymentTransactionCronModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, rental_context_domain_repositories_module_1.RentalContextDomainRepositoriesModule, payment_bulls_module_1.PaymentBullsModule, graphql_subscriptions_module_1.GraphqlSubscriptionsModule],
        providers: [...commands],
        controllers,
    })
], PaymentTransactionCronModule);
exports.PaymentTransactionCronModule = PaymentTransactionCronModule;
//# sourceMappingURL=payment-transaction-cron.module.js.map