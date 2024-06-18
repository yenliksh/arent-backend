"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEventHandler = void 0;
const domain_events_1 = require("./domain-events");
class DomainEventHandler {
    constructor(event) {
        this.event = event;
    }
    listen() {
        domain_events_1.DomainEvents.subscribe(this.event, this);
    }
}
exports.DomainEventHandler = DomainEventHandler;
//# sourceMappingURL=domain-event-handler.base.js.map