import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { ConfigService } from '@nestjs/config';
import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { RecurringPaymentLastWithdrawFailureEvent } from './recurring-payment-last-withdraw-failure.event';
export declare class RecurringPaymentLastWithdrawFailureService extends BaseNotificationRecipients {
    private readonly simpleEmailService;
    constructor(simpleEmailService: SimpleEmailService, configService: ConfigService);
    handle({ recipientId, contractId }: RecurringPaymentLastWithdrawFailureEvent): Promise<void>;
    private sendEmailNotification;
    private templateMessage;
}
