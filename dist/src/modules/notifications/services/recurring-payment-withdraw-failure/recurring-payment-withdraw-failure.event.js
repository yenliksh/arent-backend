"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurringPaymentWithdrawFailureEvent = void 0;
const types_1 = require("../../types");
class RecurringPaymentWithdrawFailureEvent {
    static create(props) {
        const payload = new RecurringPaymentWithdrawFailureEvent();
        Object.assign(payload, props);
        return payload;
    }
}
exports.RecurringPaymentWithdrawFailureEvent = RecurringPaymentWithdrawFailureEvent;
RecurringPaymentWithdrawFailureEvent.eventName = types_1.NotificationEventTypes.RECURRING_PAYMENT_WITHDRAW_FAILURE;
//# sourceMappingURL=recurring-payment-withdraw-failure.event.js.map