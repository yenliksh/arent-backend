import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Result } from 'oxide.ts';
import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { BookingRequestStatusChangedEvent } from './booking-request-status-changed.event';
export declare class BookingRequestStatusChangedService extends BaseNotificationRecipients {
    private readonly simpleEmailService;
    constructor(simpleEmailService: SimpleEmailService, configService: ConfigService);
    handle({ recipientId }: BookingRequestStatusChangedEvent): Promise<Result<string, HttpException>>;
    private sendEmailNotification;
    private templateMessage;
}
