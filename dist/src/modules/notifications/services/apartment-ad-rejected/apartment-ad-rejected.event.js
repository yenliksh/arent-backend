"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdRejectedEvent = void 0;
const types_1 = require("../../types");
class ApartmentAdRejectedEvent {
    static create(props) {
        const payload = new ApartmentAdRejectedEvent();
        Object.assign(payload, props);
        return payload;
    }
}
exports.ApartmentAdRejectedEvent = ApartmentAdRejectedEvent;
ApartmentAdRejectedEvent.eventName = types_1.NotificationEventTypes.APARTMENT_AD_REJECTED;
//# sourceMappingURL=apartment-ad-rejected.event.js.map