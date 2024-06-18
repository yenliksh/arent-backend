"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReminderNeedToPayRentEvent = void 0;
const types_1 = require("../../types");
class ReminderNeedToPayRentEvent {
    static create(props) {
        const payload = new ReminderNeedToPayRentEvent();
        Object.assign(payload, props);
        return payload;
    }
}
exports.ReminderNeedToPayRentEvent = ReminderNeedToPayRentEvent;
ReminderNeedToPayRentEvent.eventName = types_1.NotificationEventTypes.REMINDER_NEED_TO_PAY_RENT;
//# sourceMappingURL=reminder-need-to-pay-rent.event.js.map