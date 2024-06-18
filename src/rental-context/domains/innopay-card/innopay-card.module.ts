import { RentalContextDomainRepositoriesModule } from '@domain-repositories/rental-context-domain-repositories.module';
import { innopayPaymentFactory } from '@infrastructure/configs/innopay-payment.factory';
import { Module } from '@nestjs/common';
import { InnopayPaymentModule } from '@third-parties/innopay-payment/src/innopay-payment.module';

import { AddChargeOffCardHandler } from './commands/add-charge-off-card/add-charge-off-card.handler';
import { DeleteCardService } from './commands/delete-card/delete-card.service';
import { SaveCardEndService } from './commands/save-card-end/save-card-end.service';
import { SaveCardStartService } from './commands/save-card-start/save-card-start.service';
import { InnopayCardController } from './controllers/innopay-card.controller';
import { FindMyCardService } from './queries/find-my-card/find-my-card.service';
import { FindMyCardsService } from './queries/find-my-cards/find-my-cards.service';
import { TenantContractCardService } from './queries/tenant-contract-card/tenant-contract-card.service';
import { InnopayCardMutationGraphqlResolver } from './resolvers/innopay-card.mutation.resolver';
import { InnopayCardQueryGraphqlResolver } from './resolvers/innopay-card.query.resolver';

const graphqlResolvers = [InnopayCardMutationGraphqlResolver, InnopayCardQueryGraphqlResolver];

const commands = [SaveCardStartService, SaveCardEndService, DeleteCardService, AddChargeOffCardHandler];

const queries = [FindMyCardsService, FindMyCardService, TenantContractCardService];

@Module({
  imports: [InnopayPaymentModule.forRootAsync(innopayPaymentFactory), RentalContextDomainRepositoriesModule],
  providers: [...graphqlResolvers, ...commands, ...queries],
  exports: [FindMyCardService],
  controllers: [InnopayCardController],
})
export class InnopayCardModule {}
