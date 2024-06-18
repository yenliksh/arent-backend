import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { ConfigService } from '@nestjs/config';
import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { PaymentTransferSuccessEvent } from './payment-transfer-success.event';
export declare class PaymentTransferSuccessService extends BaseNotificationRecipients {
    private readonly simpleEmailService;
    constructor(simpleEmailService: SimpleEmailService, configService: ConfigService);
    handle({ recipientId }: PaymentTransferSuccessEvent): Promise<void>;
    private sendEmailNotification;
    private templateMessage;
}
