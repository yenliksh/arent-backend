import { RentalContextDomainRepositoriesModule } from '@domain-repositories/rental-context-domain-repositories.module';
import { innopayPaymentFactory } from '@infrastructure/configs/innopay-payment.factory';
import { importSsutSqsModule } from '@libs/utils/import-ssut-sqs-module';
import { SQSQueues } from '@modules/aws/sqs/constants';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InnopayPaymentModule } from '@third-parties/innopay-payment/src/innopay-payment.module';

import { InnopayTransactionBullsModule } from './bulls/innopay-transaction-bulls.module';
import { ReverseInnopayTransactionHandler } from './commands/reverse-innopay-transaction/reverse-innopay-transaction.handler';
import { InnopayTransactionRestApiWebhookController } from './webhooks/rest-api/innopay-transaction.webhook.controller';
import { InnopayTransactionRestApiWebhookService } from './webhooks/rest-api/innopay-transaction.webhook.service';
import { CancelInnopayTransactionConsumer } from './webhooks/sqs/cancel-innopay-transaction.consumer';
import { CheckAccessInnopayGuidConsumer } from './webhooks/sqs/check-access-innopay-guid.consumer';
import { CompleteCashOutInnopayTransactionConsumer } from './webhooks/sqs/complete-cash-out-innopay-transaction.consumer';
import { StuckedInnopayGuidStatusConsumer } from './webhooks/sqs/stucked-innopay-guid-status.consumer';

const consumers = [
  CheckAccessInnopayGuidConsumer,
  StuckedInnopayGuidStatusConsumer,
  CancelInnopayTransactionConsumer,
  CompleteCashOutInnopayTransactionConsumer,
];
const commands = [InnopayTransactionRestApiWebhookService, ReverseInnopayTransactionHandler];

@Module({
  imports: [
    importSsutSqsModule({
      consumers: [
        {
          name: SQSQueues.checkAccessInnopayGuidQueue.name,
          queueUrl: SQSQueues.checkAccessInnopayGuidQueue.url,
          region: process.env.SQS_AWS_REGION_NAME,
        },
        {
          name: SQSQueues.stuckedInnopayGuidStatusQueue.name,
          queueUrl: SQSQueues.stuckedInnopayGuidStatusQueue.url,
          region: process.env.SQS_AWS_REGION_NAME,
        },
        {
          name: SQSQueues.cancelInnopayTransactionQueue.name,
          queueUrl: SQSQueues.cancelInnopayTransactionQueue.url,
          region: process.env.SQS_AWS_REGION_NAME,
        },
        {
          name: SQSQueues.completeCashOutInnopayTransactionQueue.name,
          queueUrl: SQSQueues.completeCashOutInnopayTransactionQueue.url,
          region: process.env.SQS_AWS_REGION_NAME,
        },
      ],
      producers: [],
    }),
    InnopayTransactionBullsModule,
    RentalContextDomainRepositoriesModule,
    InnopayPaymentModule.forRootAsync(innopayPaymentFactory),
    CqrsModule,
  ],
  controllers: [InnopayTransactionRestApiWebhookController],
  providers: [...consumers, ...commands],
})
export class InnopayTransactionModule {}
