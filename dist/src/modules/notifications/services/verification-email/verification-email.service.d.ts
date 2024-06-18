import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { ConfigService } from '@nestjs/config';
import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { VerificationEmailEvent } from './verification-email.event';
export declare class VerificationEmailService extends BaseNotificationRecipients {
    private readonly simpleEmailService;
    constructor(simpleEmailService: SimpleEmailService, configService: ConfigService);
    handle({ recipientId, token }: VerificationEmailEvent): Promise<void>;
    private getRecipient;
    private sendEmailNotification;
}
