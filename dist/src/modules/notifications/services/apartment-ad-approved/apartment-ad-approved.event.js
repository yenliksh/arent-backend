"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdApprovedEvent = void 0;
const types_1 = require("../../types");
class ApartmentAdApprovedEvent {
    static create(props) {
        const payload = new ApartmentAdApprovedEvent();
        Object.assign(payload, props);
        return payload;
    }
}
exports.ApartmentAdApprovedEvent = ApartmentAdApprovedEvent;
ApartmentAdApprovedEvent.eventName = types_1.NotificationEventTypes.APARTMENT_AD_APPROVED;
//# sourceMappingURL=apartment-ad-approved.event.js.map