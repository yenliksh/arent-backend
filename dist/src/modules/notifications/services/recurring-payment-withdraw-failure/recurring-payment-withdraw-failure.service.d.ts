import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { ConfigService } from '@nestjs/config';
import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { RecurringPaymentWithdrawFailureEvent } from './recurring-payment-withdraw-failure.event';
export declare class RecurringPaymentWithdrawFailureService extends BaseNotificationRecipients {
    private readonly simpleEmailService;
    constructor(simpleEmailService: SimpleEmailService, configService: ConfigService);
    handle({ recipientId }: RecurringPaymentWithdrawFailureEvent): Promise<void>;
    private sendEmailNotification;
    private templateMessage;
}
