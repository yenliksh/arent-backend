"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentBullsModule = void 0;
const rental_context_domain_repositories_module_1 = require("../../../domain-repositories/rental-context-domain-repositories.module");
const innopay_transaction_bulls_module_1 = require("../../innopay-transaction/bulls/innopay-transaction-bulls.module");
const innopay_payment_factory_1 = require("../../../../infrastructure/configs/innopay-payment.factory");
const graphql_subscriptions_module_1 = require("../../../../modules/graphql-subscriptions/graphql-subscriptions.module");
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const innopay_payment_module_1 = require("../../../../third-parties/innopay-payment/src/innopay-payment.module");
const transaction_cancel_processor_1 = require("./processors/transaction-cancel.processor");
const transaction_cash_in_processor_1 = require("./processors/transaction-cash-in.processor");
const transaction_cash_out_processor_1 = require("./processors/transaction-cash-out.processor");
const payment_queue_1 = require("./queue/payment.queue");
const types_1 = require("./types");
const queues = [payment_queue_1.PaymentQueue];
const processors = [
    transaction_cash_in_processor_1.PaymentTransactionCashInProcessor,
    transaction_cash_out_processor_1.PaymentTransactionCashOutProcessor,
    transaction_cancel_processor_1.PaymentTransactionCancelProcessor,
];
let PaymentBullsModule = class PaymentBullsModule {
};
PaymentBullsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({ name: types_1.PaymentBulls.PAYMENT_TRANSACTION }),
            innopay_payment_module_1.InnopayPaymentModule.forRootAsync(innopay_payment_factory_1.innopayPaymentFactory),
            rental_context_domain_repositories_module_1.RentalContextDomainRepositoriesModule,
            graphql_subscriptions_module_1.GraphqlSubscriptionsModule,
            cqrs_1.CqrsModule,
            innopay_transaction_bulls_module_1.InnopayTransactionBullsModule,
        ],
        providers: [...queues, ...processors],
        exports: queues,
    })
], PaymentBullsModule);
exports.PaymentBullsModule = PaymentBullsModule;
//# sourceMappingURL=payment-bulls.module.js.map