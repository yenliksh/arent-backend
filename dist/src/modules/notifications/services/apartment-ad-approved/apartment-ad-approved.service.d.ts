import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { ConfigService } from '@nestjs/config';
import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { ApartmentAdApprovedEvent } from './apartment-ad-approved.event';
export declare class ApartmentAdApprovedService extends BaseNotificationRecipients {
    private readonly simpleEmailService;
    constructor(simpleEmailService: SimpleEmailService, configService: ConfigService);
    handle({ recipientId }: ApartmentAdApprovedEvent): Promise<void>;
    private sendEmailNotification;
    private templateMessage;
}
