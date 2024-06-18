import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { ConfigService } from '@nestjs/config';
import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { RequireIdentityDocumentEvent } from './require-identity-document.event';
export declare class RequireIdentityDocumentService extends BaseNotificationRecipients {
    private readonly simpleEmailService;
    constructor(simpleEmailService: SimpleEmailService, configService: ConfigService);
    handle({ recipientId }: RequireIdentityDocumentEvent): Promise<void>;
    private getRecipient;
    private sendEmailNotification;
}
