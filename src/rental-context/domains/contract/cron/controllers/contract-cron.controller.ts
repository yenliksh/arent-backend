import { BasicAuthGuard } from '@infrastructure/guards/basic-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';

import { CompletePastContractsCommand } from '../commands/complete-past-contracts/complete-past-contracts.command';

@ApiTags('Webhook. Contract')
@Controller('v1/contract')
@UseGuards(BasicAuthGuard)
@ApiBearerAuth()
export class ContractCronController {
  constructor(private commandBus: CommandBus) {}

  @Get('complete-past-contracts')
  public async completePastContract() {
    Sentry.captureException('trigger complete past contracts');
    await this.commandBus.execute<CompletePastContractsCommand>(new CompletePastContractsCommand());
    return true;
  }
}
