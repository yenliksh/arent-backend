"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRequestSentEvent = void 0;
const types_1 = require("../../types");
class BookingRequestSentEvent {
    static create(props) {
        const payload = new BookingRequestSentEvent();
        Object.assign(payload, props);
        return payload;
    }
}
exports.BookingRequestSentEvent = BookingRequestSentEvent;
BookingRequestSentEvent.eventName = types_1.NotificationEventTypes.BOOKING_REQUEST_SENT;
//# sourceMappingURL=booking-request-sent.event.js.map