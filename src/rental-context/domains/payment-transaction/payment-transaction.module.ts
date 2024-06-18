import { RentalContextDomainRepositoriesModule } from '@domain-repositories/rental-context-domain-repositories.module';
import { InnopayTransactionBullsModule } from '@domains/innopay-transaction/bulls/innopay-transaction-bulls.module';
import { innopayPaymentFactory } from '@infrastructure/configs/innopay-payment.factory';
import { GraphqlSubscriptionsModule } from '@modules/graphql-subscriptions/graphql-subscriptions.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InnopayPaymentModule } from '@third-parties/innopay-payment/src/innopay-payment.module';

import { PaymentBullsModule } from './bulls/payment-bulls.module';
import { CompleteFirstCashInContractHandler } from './commands/complete-first-cash-in-contract/complete-first-cash-in-contract.handler';
import { SystemFirstContractPayHandler } from './commands/system-first-contract-pay/system-first-contract-pay.handler';
import { TenantManuallyPayHandler } from './commands/tenant-manually-pay/tenant-manually-pay.handler';
import { PaymentTransactionCronModule } from './cron/payment-transaction-cron.module';
import { FindPaymentTransactionService } from './queries/find-payment-transaction/find-payment-transaction.service';
import { NextPaymentTransactionService } from './queries/next-payment-transaction/next-payment-transaction.service';
import { PaymentInvoicesHistoryService } from './queries/payment-invoices-history/payment-invoices-history.service';
import { PaymentInvoiceResolver } from './resolvers/model-resolvers/payment-invoice.resolver';
import { PaymentTransactionResolver } from './resolvers/model-resolvers/payment-transaction.resolver';
import { PaymentTransactionMutationGraphqlResolver } from './resolvers/payment-transaction.mutation.resolver';
import { PaymentTransactionQueryGraphqlResolver } from './resolvers/payment-transaction.query.resolver';
import { PaymentTransactionSubscriptionResolver } from './resolvers/payment-transaction.subscription.resolver';

const resolvers = [
  PaymentTransactionResolver,
  PaymentInvoiceResolver,
  PaymentTransactionQueryGraphqlResolver,
  PaymentTransactionSubscriptionResolver,
  PaymentTransactionMutationGraphqlResolver,
];

const commands = [TenantManuallyPayHandler, SystemFirstContractPayHandler, CompleteFirstCashInContractHandler];

const queries = [FindPaymentTransactionService, PaymentInvoicesHistoryService, NextPaymentTransactionService];

@Module({
  imports: [
    InnopayPaymentModule.forRootAsync(innopayPaymentFactory),
    CqrsModule,
    PaymentBullsModule,
    RentalContextDomainRepositoriesModule,
    GraphqlSubscriptionsModule,
    PaymentTransactionCronModule,
    InnopayTransactionBullsModule,
  ],
  providers: [...resolvers, ...commands, ...queries],
})
export class PaymentTransactionModule {}
