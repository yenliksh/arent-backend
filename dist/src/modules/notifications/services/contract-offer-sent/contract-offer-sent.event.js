"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractOfferSentEvent = void 0;
const types_1 = require("../../types");
class ContractOfferSentEvent {
    static create(props) {
        const payload = new ContractOfferSentEvent();
        Object.assign(payload, props);
        return payload;
    }
}
exports.ContractOfferSentEvent = ContractOfferSentEvent;
ContractOfferSentEvent.eventName = types_1.NotificationEventTypes.CONTRACT_OFFER_SENT;
//# sourceMappingURL=contract-offer-sent.event.js.map