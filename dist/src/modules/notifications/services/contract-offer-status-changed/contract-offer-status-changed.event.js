"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractOfferStatusChangedEvent = void 0;
const types_1 = require("../../types");
class ContractOfferStatusChangedEvent {
    static create(props) {
        const payload = new ContractOfferStatusChangedEvent();
        Object.assign(payload, props);
        return payload;
    }
}
exports.ContractOfferStatusChangedEvent = ContractOfferStatusChangedEvent;
ContractOfferStatusChangedEvent.eventName = types_1.NotificationEventTypes.CONTRACT_OFFER_STATUS_CHANGED;
//# sourceMappingURL=contract-offer-status-changed.event.js.map