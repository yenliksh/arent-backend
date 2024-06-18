import { RentalContextDomainRepositoriesModule } from '@domain-repositories/rental-context-domain-repositories.module';
import { GraphqlSubscriptionsModule } from '@modules/graphql-subscriptions/graphql-subscriptions.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PaymentBullsModule } from '../bulls/payment-bulls.module';
import { TenantRecurrentPayHandler } from './commands/tenant-recurrent-pay/tenant-recurrent-pay.handler';
import { TransferMoneyToReceiverHandler } from './commands/transfer-money-to-receiver/transfer-money-to-receiver.handler';
import { WebhookRecurrentPaymentController } from './controllers/webhook-recurrent-payment.controller';

const commands = [TenantRecurrentPayHandler, TransferMoneyToReceiverHandler];

const controllers = [WebhookRecurrentPaymentController];

@Module({
  imports: [CqrsModule, RentalContextDomainRepositoriesModule, PaymentBullsModule, GraphqlSubscriptionsModule],
  providers: [...commands],
  controllers,
})
export class PaymentTransactionCronModule {}
