"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = void 0;
const domain_events_1 = require("../domain-events/domain-events");
const entity_base_1 = require("./entity.base");
class AggregateRoot extends entity_base_1.Entity {
    constructor() {
        super(...arguments);
        this._domainEvents = [];
    }
    get domainEvents() {
        return this._domainEvents;
    }
    addEvent(domainEvent) {
        this._domainEvents.push(domainEvent);
        domain_events_1.DomainEvents.prepareForPublish(this);
    }
    clearEvents() {
        this._domainEvents = [];
    }
}
exports.AggregateRoot = AggregateRoot;
//# sourceMappingURL=aggregate-root.base.js.map