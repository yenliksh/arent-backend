import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Result } from 'oxide.ts';
import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { ContractOfferStatusChangedEvent } from './contract-offer-status-changed.event';
export declare class ContractOfferStatusChangedService extends BaseNotificationRecipients {
    private readonly simpleEmailService;
    constructor(simpleEmailService: SimpleEmailService, configService: ConfigService);
    handle({ recipientId, isLandLord }: ContractOfferStatusChangedEvent): Promise<Result<string, HttpException>>;
    private sendEmailNotification;
    private templateMessage;
}
