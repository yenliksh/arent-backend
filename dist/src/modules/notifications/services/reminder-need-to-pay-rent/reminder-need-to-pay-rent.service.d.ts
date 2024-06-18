import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { ConfigService } from '@nestjs/config';
import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
export declare class ReminderNeedToPayRentService extends BaseNotificationRecipients {
    private readonly simpleEmailService;
    constructor(simpleEmailService: SimpleEmailService, configService: ConfigService);
    handle(): Promise<void>;
    private sendEmailNotification;
    private templateMessage;
}
