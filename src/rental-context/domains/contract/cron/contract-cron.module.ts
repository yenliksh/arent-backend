import { RentalContextDomainRepositoriesModule } from '@domain-repositories/rental-context-domain-repositories.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CompletePastContractHandler } from './commands/complete-past-contracts/complete-past-contracts.handler';
import { ContractCronController } from './controllers/contract-cron.controller';

const commands = [CompletePastContractHandler];

const controllers = [ContractCronController];

@Module({
  imports: [CqrsModule, RentalContextDomainRepositoriesModule],
  providers: [...commands],
  controllers,
})
export class ContractCronModule {}
