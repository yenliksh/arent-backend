"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurringPaymentWithdrawSuccessEvent = void 0;
const types_1 = require("../../types");
class RecurringPaymentWithdrawSuccessEvent {
    static create(props) {
        const payload = new RecurringPaymentWithdrawSuccessEvent();
        Object.assign(payload, props);
        return payload;
    }
}
exports.RecurringPaymentWithdrawSuccessEvent = RecurringPaymentWithdrawSuccessEvent;
RecurringPaymentWithdrawSuccessEvent.eventName = types_1.NotificationEventTypes.RECURRING_PAYMENT_WITHDRAW_SUCCESS;
//# sourceMappingURL=recurring-payment-withdraw-success.event.js.map