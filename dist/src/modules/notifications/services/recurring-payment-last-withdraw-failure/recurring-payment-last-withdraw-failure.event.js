"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurringPaymentLastWithdrawFailureEvent = void 0;
const types_1 = require("../../types");
class RecurringPaymentLastWithdrawFailureEvent {
    static create(props) {
        const payload = new RecurringPaymentLastWithdrawFailureEvent();
        Object.assign(payload, props);
        return payload;
    }
}
exports.RecurringPaymentLastWithdrawFailureEvent = RecurringPaymentLastWithdrawFailureEvent;
RecurringPaymentLastWithdrawFailureEvent.eventName = types_1.NotificationEventTypes.RECURRING_PAYMENT_LAST_WITHDRAW_FAILURE;
//# sourceMappingURL=recurring-payment-last-withdraw-failure.event.js.map