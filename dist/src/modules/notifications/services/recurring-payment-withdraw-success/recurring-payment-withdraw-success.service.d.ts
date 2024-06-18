import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { ConfigService } from '@nestjs/config';
import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { RecurringPaymentWithdrawSuccessEvent } from './recurring-payment-withdraw-success.event';
export declare class RecurringPaymentWithdrawSuccessService extends BaseNotificationRecipients {
    private readonly simpleEmailService;
    constructor(simpleEmailService: SimpleEmailService, configService: ConfigService);
    handle({ recipientId, contractId, paymentTransactionId }: RecurringPaymentWithdrawSuccessEvent): Promise<void>;
    private sendEmailNotification;
    private templateMessage;
}
