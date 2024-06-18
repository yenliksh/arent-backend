"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashInFailedEvent = void 0;
const types_1 = require("./types");
class CashInFailedEvent {
    static create(props) {
        const payload = new CashInFailedEvent();
        Object.assign(payload, props);
        return payload;
    }
}
exports.CashInFailedEvent = CashInFailedEvent;
CashInFailedEvent.eventName = types_1.PaymentTransactionEvents.CASH_IN_FAILED;
//# sourceMappingURL=events.js.map