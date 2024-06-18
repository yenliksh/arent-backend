import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { ConfigService } from '@nestjs/config';
import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { BookingRequestSentEvent } from '../booking-request-sent/booking-request-sent.event';
export declare class ApartmentAdRejectService extends BaseNotificationRecipients {
    private readonly simpleEmailService;
    constructor(simpleEmailService: SimpleEmailService, configService: ConfigService);
    handle({ recipientId }: BookingRequestSentEvent): Promise<void>;
    private sendEmailNotification;
    private templateMessage;
}
