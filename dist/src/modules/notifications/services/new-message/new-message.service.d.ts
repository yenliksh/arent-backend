import { BaseNotificationRecipients } from '@modules/notifications/base/notification-recipients.base';
import { ConfigService } from '@nestjs/config';
import { SimpleEmailService } from '@third-parties/simple-email/src';
import { NewMessageEvent } from './new-message.event';
export declare class NewMessageService extends BaseNotificationRecipients {
    private readonly simpleEmailService;
    constructor(simpleEmailService: SimpleEmailService, configService: ConfigService);
    handle({ senderId, chatMembers, chatId }: NewMessageEvent): Promise<void>;
    private getRecipientsAndSender;
    private sendEmailNotification;
}
