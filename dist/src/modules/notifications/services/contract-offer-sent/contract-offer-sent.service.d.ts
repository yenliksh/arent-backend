import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Result } from 'oxide.ts';
import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { ContractOfferSentEvent } from './contract-offer-sent.event';
export declare class ContractOfferSentService extends BaseNotificationRecipients {
    private readonly simpleEmailService;
    constructor(simpleEmailService: SimpleEmailService, configService: ConfigService);
    handle({ recipientId }: ContractOfferSentEvent): Promise<Result<string, HttpException>>;
    private sendEmailNotification;
    private templateMessage;
}
