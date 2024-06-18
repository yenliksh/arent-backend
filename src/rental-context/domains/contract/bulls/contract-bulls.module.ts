import { RentalContextDomainRepositoriesModule } from '@domain-repositories/rental-context-domain-repositories.module';
import { InnopayTransactionBullsModule } from '@domains/innopay-transaction/bulls/innopay-transaction-bulls.module';
import { innopayPaymentFactory } from '@infrastructure/configs/innopay-payment.factory';
import { ElasticsearchCoreModule } from '@infrastructure/elastic-search/elasticsearch-core.module';
import { GraphqlSubscriptionsModule } from '@modules/graphql-subscriptions/graphql-subscriptions.module';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InnopayPaymentModule } from '@third-parties/innopay-payment/src/innopay-payment.module';

import { AcceptContractOfferProcessor } from './processors/accept-contract-offer.processor';
import { InstantBookingProcessor } from './processors/instant-booking.processor';
import { InstantTemporaryBookingProcessor } from './processors/instant-temporary-booking.processor';
import { RejectContractOfferProcessor } from './processors/reject-contract-offer.processor';
import { SendContractOfferProcessor } from './processors/send-contract-offer.processor';
import { ContractTemporaryConcludeProcessor } from './processors/temporapy-contract-conclude.processor';
import { ContractOfferQueue } from './queue/contract-offer.queue';
import { ContractOfferPubSubService } from './services/contract-offer-pub-sub.service';
import { ContractBulls } from './types';

const queues = [ContractOfferQueue];

const processors = [
  AcceptContractOfferProcessor,
  RejectContractOfferProcessor,
  SendContractOfferProcessor,
  InstantBookingProcessor,
  ContractTemporaryConcludeProcessor,
  InstantTemporaryBookingProcessor,
];

const services = [ContractOfferPubSubService];

@Module({
  imports: [
    BullModule.registerQueue({ name: ContractBulls.CONTRACT_OFFER_QUEUE }),
    InnopayPaymentModule.forRootAsync(innopayPaymentFactory),
    RentalContextDomainRepositoriesModule,
    ElasticsearchCoreModule,
    GraphqlSubscriptionsModule,
    CqrsModule,
    InnopayTransactionBullsModule,
  ],
  providers: [...queues, ...processors, ...services],
  exports: queues,
})
export class ContractBullsModule {}
