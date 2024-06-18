import { ConfigService } from '@nestjs/config';
import { ReminderNeedToPayRentService } from '../services/reminder-need-to-pay-rent/reminder-need-to-pay-rent.service';
export declare class WebhookReminderController {
    private readonly reminderNeedToPayRentService;
    private readonly configService;
    isDevelopment: boolean;
    constructor(reminderNeedToPayRentService: ReminderNeedToPayRentService, configService: ConfigService);
    needToPayRent(): Promise<boolean>;
}
