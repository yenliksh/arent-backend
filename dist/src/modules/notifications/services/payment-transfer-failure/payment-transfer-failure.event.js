"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTransferFailureEvent = void 0;
const types_1 = require("../../types");
class PaymentTransferFailureEvent {
    static create(props) {
        const payload = new PaymentTransferFailureEvent();
        Object.assign(payload, props);
        return payload;
    }
}
exports.PaymentTransferFailureEvent = PaymentTransferFailureEvent;
PaymentTransferFailureEvent.eventName = types_1.NotificationEventTypes.PAYMENT_TRANSFER_FAILURE;
//# sourceMappingURL=payment-transfer-failure.event.js.map