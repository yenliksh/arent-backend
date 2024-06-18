"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTransferSuccessEvent = void 0;
const types_1 = require("../../types");
class PaymentTransferSuccessEvent {
    static create(props) {
        const payload = new PaymentTransferSuccessEvent();
        Object.assign(payload, props);
        return payload;
    }
}
exports.PaymentTransferSuccessEvent = PaymentTransferSuccessEvent;
PaymentTransferSuccessEvent.eventName = types_1.NotificationEventTypes.PAYMENT_TRANSFER_SUCCESS;
//# sourceMappingURL=payment-transfer-success.event.js.map