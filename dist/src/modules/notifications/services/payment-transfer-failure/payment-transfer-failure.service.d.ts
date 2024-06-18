import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { ConfigService } from '@nestjs/config';
import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { PaymentTransferFailureEvent } from './payment-transfer-failure.event';
export declare class PaymentTransferFailureService extends BaseNotificationRecipients {
    private readonly simpleEmailService;
    constructor(simpleEmailService: SimpleEmailService, configService: ConfigService);
    handle({ recipientId }: PaymentTransferFailureEvent): Promise<void>;
    private sendEmailNotification;
    private templateMessage;
}
