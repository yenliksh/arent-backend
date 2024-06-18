import { RentalContextDomainRepositoriesModule } from '@domain-repositories/rental-context-domain-repositories.module';
import { innopayPaymentFactory } from '@infrastructure/configs/innopay-payment.factory';
import { AwsModule } from '@modules/aws/aws.module';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InnopayPaymentModule } from '@third-parties/innopay-payment/src/innopay-payment.module';

import { CancelInnopayTransactionProcessor } from './handlers/cancel-innopay-transaction.processor';
import { CompleteCashOutProcessor } from './handlers/complete-cash-out.processor';
import { HandleCustomerReferenceProcessor } from './handlers/handle-customer-reference.processor';
import { InnopayTransactionBullsQueue } from './innopay-transaction-bulls.queue';
import { CancelInnopayTransactionProducer } from './sqs-producers/cancel-innopay-transaction.producer';
import { CheckAccessInnopayGuidProducer } from './sqs-producers/check-access-innopay-guid.producer';
import { CompleteCashOutInnopayTransactionProducer } from './sqs-producers/complete-cash-out-innopay-transaction.producer';
import { StuckedInnopayGuidStatusProducer } from './sqs-producers/stucked-innopay-guid-status.producer';
import { InnopayBulls } from './types';

const producers = [
  CheckAccessInnopayGuidProducer,
  StuckedInnopayGuidStatusProducer,
  CancelInnopayTransactionProducer,
  CompleteCashOutInnopayTransactionProducer,
];
const queues = [InnopayTransactionBullsQueue];
const processors = [HandleCustomerReferenceProcessor, CancelInnopayTransactionProcessor, CompleteCashOutProcessor];

@Module({
  imports: [
    BullModule.registerQueue({ name: InnopayBulls.INNOPAY_TRANSACTION }),
    AwsModule,
    RentalContextDomainRepositoriesModule,
    InnopayPaymentModule.forRootAsync(innopayPaymentFactory),
    CqrsModule,
  ],
  providers: [...producers, ...queues, ...processors],
  exports: [...producers, ...queues],
})
export class InnopayTransactionBullsModule {}
