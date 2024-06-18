"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRequestStatusChangedEvent = void 0;
const types_1 = require("../../types");
class BookingRequestStatusChangedEvent {
    static create(props) {
        const payload = new BookingRequestStatusChangedEvent();
        Object.assign(payload, props);
        return payload;
    }
}
exports.BookingRequestStatusChangedEvent = BookingRequestStatusChangedEvent;
BookingRequestStatusChangedEvent.eventName = types_1.NotificationEventTypes.BOOKING_REQUEST_STATUS_CHANGED;
//# sourceMappingURL=booking-request-status-changed.event.js.map