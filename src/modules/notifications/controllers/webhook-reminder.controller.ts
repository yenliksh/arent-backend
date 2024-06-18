import { BasicAuthGuard } from '@infrastructure/guards/basic-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ReminderNeedToPayRentService } from '../services/reminder-need-to-pay-rent/reminder-need-to-pay-rent.service';

@ApiTags('Webhook. Reminder')
@Controller('v1/reminder')
@UseGuards(BasicAuthGuard)
@ApiBearerAuth()
export class WebhookReminderController {
  isDevelopment: boolean;

  constructor(
    private readonly reminderNeedToPayRentService: ReminderNeedToPayRentService,
    private readonly configService: ConfigService,
  ) {
    this.isDevelopment = this.configService.get<string>('nodeEnv') === 'development';
  }

  @Get('need-to-pay-rent')
  public async needToPayRent() {
    if (this.isDevelopment) {
      return false;
    }

    await this.reminderNeedToPayRentService.handle();

    return true;
  }
}
