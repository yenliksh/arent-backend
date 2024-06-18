import { RentalContextDomainRepositoriesModule } from '@domain-repositories/rental-context-domain-repositories.module';
import { InnopayTransactionBullsModule } from '@domains/innopay-transaction/bulls/innopay-transaction-bulls.module';
import { innopayPaymentFactory } from '@infrastructure/configs/innopay-payment.factory';
import { GraphqlSubscriptionsModule } from '@modules/graphql-subscriptions/graphql-subscriptions.module';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InnopayPaymentModule } from '@third-parties/innopay-payment/src/innopay-payment.module';

import { PaymentTransactionCancelProcessor } from './processors/transaction-cancel.processor';
import { PaymentTransactionCashInProcessor } from './processors/transaction-cash-in.processor';
import { PaymentTransactionCashOutProcessor } from './processors/transaction-cash-out.processor';
import { PaymentQueue } from './queue/payment.queue';
import { PaymentBulls } from './types';

const queues = [PaymentQueue];

const processors = [
  PaymentTransactionCashInProcessor,
  PaymentTransactionCashOutProcessor,
  PaymentTransactionCancelProcessor,
];

@Module({
  imports: [
    BullModule.registerQueue({ name: PaymentBulls.PAYMENT_TRANSACTION }),
    InnopayPaymentModule.forRootAsync(innopayPaymentFactory),
    RentalContextDomainRepositoriesModule,
    GraphqlSubscriptionsModule,
    CqrsModule,
    InnopayTransactionBullsModule,
  ],
  providers: [...queues, ...processors],
  exports: queues,
})
export class PaymentBullsModule {}
