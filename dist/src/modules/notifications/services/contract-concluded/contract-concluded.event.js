"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractConcludedEvent = void 0;
const types_1 = require("../../types");
class ContractConcludedEvent {
    static create(props) {
        const payload = new ContractConcludedEvent();
        Object.assign(payload, props);
        return payload;
    }
}
exports.ContractConcludedEvent = ContractConcludedEvent;
ContractConcludedEvent.eventName = types_1.NotificationEventTypes.CONTRACT_CONCLUDED;
//# sourceMappingURL=contract-concluded.event.js.map