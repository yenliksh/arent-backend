"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseNotificationRecipients = void 0;
const types_1 = require("../../../rental-context/domains/chat/domain/types");
const notification_recipients_builder_1 = require("./notification-recipients.builder");
class BaseNotificationRecipients {
    constructor(configService) {
        this.emailFrom = configService.get('ses.emailFrom');
        this.frontendUrl = configService.get('frontEnd.url');
    }
    builder(recipients) {
        if (Array.isArray(recipients)) {
            return new notification_recipients_builder_1.NotificationRecipientsBuilder(recipients);
        }
        return new notification_recipients_builder_1.NotificationRecipientsBuilder([recipients]);
    }
    setUserRole(recipients, options) {
        const { tenantIds, landlordIds } = options;
        const recipientsWithRole = recipients.map((recipient) => {
            const isTenant = tenantIds.includes(recipient.id);
            if (isTenant) {
                return { ...recipient, role: types_1.UserChatRole.TENANT };
            }
            const isLandlord = landlordIds.includes(recipient.id);
            if (isLandlord) {
                return { ...recipient, role: types_1.UserChatRole.LANDLORD };
            }
            return undefined;
        });
        return recipientsWithRole.filter((i) => i != null);
    }
}
exports.BaseNotificationRecipients = BaseNotificationRecipients;
//# sourceMappingURL=notification-recipients.base.js.map