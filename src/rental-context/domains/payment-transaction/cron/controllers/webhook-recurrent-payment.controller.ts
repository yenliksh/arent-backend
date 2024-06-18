import { BasicAuthGuard } from '@infrastructure/guards/basic-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';

import { TenantRecurrentPayCommand } from '../commands/tenant-recurrent-pay/tenant-recurrent-pay.command';
import { TransferMoneyToReceiverCommand } from '../commands/transfer-money-to-receiver/transfer-money-to-receiver.command';

@ApiTags('Webhook. Payment')
@Controller('v1/payment')
@UseGuards(BasicAuthGuard)
@ApiBearerAuth()
export class WebhookRecurrentPaymentController {
  constructor(private commandBus: CommandBus) {}

  @Get('transfer-money')
  public async transferMoneyToLandlord() {
    Sentry.captureException('trigger transfer-money test');
    await this.commandBus.execute<TransferMoneyToReceiverCommand>(new TransferMoneyToReceiverCommand());
    return true;
  }

  @Get('withdrawal-money')
  public async withdrawalMoneyFromTenant() {
    Sentry.captureException('trigger withdrawal-money test');
    await this.commandBus.execute<TenantRecurrentPayCommand>(new TenantRecurrentPayCommand());
    return true;
  }
}
