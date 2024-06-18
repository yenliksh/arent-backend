import { ConfigService } from '@nestjs/config';
import { NotificationRecipientsBuilder } from './notification-recipients.builder';
import { INotificationRecipient, UserWithRole } from './types';
export declare abstract class BaseNotificationRecipients {
    protected emailFrom: string;
    protected frontendUrl: string;
    constructor(configService: ConfigService);
    abstract handle(...props: any): void;
    protected builder<T extends INotificationRecipient>(recipient: T): NotificationRecipientsBuilder<T>;
    protected builder<T extends INotificationRecipient>(recipients: T[]): NotificationRecipientsBuilder<T>;
    protected setUserRole<T extends INotificationRecipient>(recipients: T[], options: {
        tenantIds: string[];
        landlordIds: string[];
    }): UserWithRole<T>[];
}
