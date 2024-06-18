"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTransactionModule = void 0;
const rental_context_domain_repositories_module_1 = require("../../domain-repositories/rental-context-domain-repositories.module");
const innopay_transaction_bulls_module_1 = require("../innopay-transaction/bulls/innopay-transaction-bulls.module");
const innopay_payment_factory_1 = require("../../../infrastructure/configs/innopay-payment.factory");
const graphql_subscriptions_module_1 = require("../../../modules/graphql-subscriptions/graphql-subscriptions.module");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const innopay_payment_module_1 = require("../../../third-parties/innopay-payment/src/innopay-payment.module");
const payment_bulls_module_1 = require("./bulls/payment-bulls.module");
const complete_first_cash_in_contract_handler_1 = require("./commands/complete-first-cash-in-contract/complete-first-cash-in-contract.handler");
const system_first_contract_pay_handler_1 = require("./commands/system-first-contract-pay/system-first-contract-pay.handler");
const tenant_manually_pay_handler_1 = require("./commands/tenant-manually-pay/tenant-manually-pay.handler");
const payment_transaction_cron_module_1 = require("./cron/payment-transaction-cron.module");
const find_payment_transaction_service_1 = require("./queries/find-payment-transaction/find-payment-transaction.service");
const next_payment_transaction_service_1 = require("./queries/next-payment-transaction/next-payment-transaction.service");
const payment_invoices_history_service_1 = require("./queries/payment-invoices-history/payment-invoices-history.service");
const payment_invoice_resolver_1 = require("./resolvers/model-resolvers/payment-invoice.resolver");
const payment_transaction_resolver_1 = require("./resolvers/model-resolvers/payment-transaction.resolver");
const payment_transaction_mutation_resolver_1 = require("./resolvers/payment-transaction.mutation.resolver");
const payment_transaction_query_resolver_1 = require("./resolvers/payment-transaction.query.resolver");
const payment_transaction_subscription_resolver_1 = require("./resolvers/payment-transaction.subscription.resolver");
const resolvers = [
    payment_transaction_resolver_1.PaymentTransactionResolver,
    payment_invoice_resolver_1.PaymentInvoiceResolver,
    payment_transaction_query_resolver_1.PaymentTransactionQueryGraphqlResolver,
    payment_transaction_subscription_resolver_1.PaymentTransactionSubscriptionResolver,
    payment_transaction_mutation_resolver_1.PaymentTransactionMutationGraphqlResolver,
];
const commands = [tenant_manually_pay_handler_1.TenantManuallyPayHandler, system_first_contract_pay_handler_1.SystemFirstContractPayHandler, complete_first_cash_in_contract_handler_1.CompleteFirstCashInContractHandler];
const queries = [find_payment_transaction_service_1.FindPaymentTransactionService, payment_invoices_history_service_1.PaymentInvoicesHistoryService, next_payment_transaction_service_1.NextPaymentTransactionService];
let PaymentTransactionModule = class PaymentTransactionModule {
};
PaymentTransactionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            innopay_payment_module_1.InnopayPaymentModule.forRootAsync(innopay_payment_factory_1.innopayPaymentFactory),
            cqrs_1.CqrsModule,
            payment_bulls_module_1.PaymentBullsModule,
            rental_context_domain_repositories_module_1.RentalContextDomainRepositoriesModule,
            graphql_subscriptions_module_1.GraphqlSubscriptionsModule,
            payment_transaction_cron_module_1.PaymentTransactionCronModule,
            innopay_transaction_bulls_module_1.InnopayTransactionBullsModule,
        ],
        providers: [...resolvers, ...commands, ...queries],
    })
], PaymentTransactionModule);
exports.PaymentTransactionModule = PaymentTransactionModule;
//# sourceMappingURL=payment-transaction.module.js.map