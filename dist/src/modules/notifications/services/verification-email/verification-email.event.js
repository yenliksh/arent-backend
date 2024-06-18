"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationEmailEvent = void 0;
const types_1 = require("../../types");
class VerificationEmailEvent {
    static create(props) {
        const payload = new VerificationEmailEvent();
        Object.assign(payload, props);
        return payload;
    }
}
exports.VerificationEmailEvent = VerificationEmailEvent;
VerificationEmailEvent.eventName = types_1.NotificationEventTypes.VERIFICATION_EMAIL;
//# sourceMappingURL=verification-email.event.js.map