import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { ConfigService } from '@nestjs/config';
import { SimpleEmailService } from '../../../../third-parties/simple-email/src/services/simple-email.service';
import { ContractConcludedEvent } from './contract-concluded.event';
export declare class ContractConcludedService extends BaseNotificationRecipients {
    private readonly simpleEmailService;
    constructor(simpleEmailService: SimpleEmailService, configService: ConfigService);
    handle({ tenantId, landlordId, chatId, contractId, paymentTransactionId }: ContractConcludedEvent): Promise<void>;
    private getFilteredRecipientsWithRole;
    private sendEmailNotification;
    private tenantTemplateMessage;
    private landlordTemplateMessage;
}
