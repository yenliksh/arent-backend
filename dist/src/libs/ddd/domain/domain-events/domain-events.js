"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvents = void 0;
const final_decorator_1 = require("../../../decorators/final.decorator");
let DomainEvents = class DomainEvents {
    static subscribe(event, eventHandler) {
        var _a;
        const eventName = event.name;
        if (!this.subscribers.has(eventName)) {
            this.subscribers.set(eventName, []);
        }
        (_a = this.subscribers.get(eventName)) === null || _a === void 0 ? void 0 : _a.push(eventHandler);
    }
    static prepareForPublish(aggregate) {
        const aggregateFound = !!this.findAggregateByID(aggregate.id);
        if (!aggregateFound) {
            this.aggregates.push(aggregate);
        }
    }
    static async publishEvents(id, logger, correlationId) {
        const aggregate = this.findAggregateByID(id);
        if (aggregate) {
            logger.debug(`[${aggregate.domainEvents.map((event) => event.constructor.name)}] published ${aggregate.id.value}`);
            await Promise.all(aggregate.domainEvents.map((event) => {
                if (correlationId && !event.correlationId) {
                    event.correlationId = correlationId;
                }
                return this.publish(event, logger);
            }));
            aggregate.clearEvents();
            this.removeAggregateFromPublishList(aggregate);
        }
    }
    static findAggregateByID(id) {
        for (const aggregate of this.aggregates) {
            if (aggregate.id.equals(id)) {
                return aggregate;
            }
        }
    }
    static removeAggregateFromPublishList(aggregate) {
        const index = this.aggregates.findIndex((a) => a.equals(aggregate));
        this.aggregates.splice(index, 1);
    }
    static async publish(event, logger) {
        const eventName = event.constructor.name;
        if (this.subscribers.has(eventName)) {
            const handlers = this.subscribers.get(eventName) || [];
            await Promise.all(handlers.map((handler) => {
                logger.debug(`[${handler.constructor.name}] handling ${event.constructor.name} ${event.aggregateId}`);
                return handler.handle(event);
            }));
        }
    }
};
DomainEvents.subscribers = new Map();
DomainEvents.aggregates = [];
DomainEvents = __decorate([
    final_decorator_1.final
], DomainEvents);
exports.DomainEvents = DomainEvents;
//# sourceMappingURL=domain-events.js.map