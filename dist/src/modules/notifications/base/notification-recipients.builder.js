"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRecipientsBuilder = void 0;
class NotificationRecipientsBuilder {
    constructor(recipients) {
        this.props = {
            recipients: [],
        };
        this.props.recipients = recipients;
    }
    get recipients() {
        return this.props.recipients;
    }
    get() {
        return this.props.recipients;
    }
    getOne() {
        return this.props.recipients[0];
    }
    filterByEmailVerified() {
        this.props.recipients = this.recipients.filter((r) => r.isEmailVerified);
        return this;
    }
    filterByEmailParams(param) {
        this.props.recipients = this.recipients.filter((u) => !!u.emailNotification[param]);
        return this;
    }
    filterByPushParams(param) {
        this.props.recipients = this.recipients.filter((u) => !!u.pushNotification[param]);
        return this;
    }
    filterBySmsParams(param) {
        this.props.recipients = this.recipients.filter((u) => !!u.smsNotification[param]);
        return this;
    }
}
exports.NotificationRecipientsBuilder = NotificationRecipientsBuilder;
//# sourceMappingURL=notification-recipients.builder.js.map