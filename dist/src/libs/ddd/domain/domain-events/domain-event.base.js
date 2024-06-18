"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvent = void 0;
const exceptions_1 = require("../../../exceptions");
const guard_1 = require("../guard");
const uuid_value_object_1 = require("../value-objects/uuid.value-object");
class DomainEvent {
    constructor(props) {
        if (guard_1.Guard.isEmpty(props)) {
            throw new exceptions_1.ArgumentNotProvidedException('DomainEvent props should not be empty');
        }
        this.id = uuid_value_object_1.UUID.generate().unpack();
        this.aggregateId = props.aggregateId;
        this.dateOccurred = props.dateOccurred || Date.now();
        if (props.correlationId)
            this.correlationId = props.correlationId;
    }
}
exports.DomainEvent = DomainEvent;
//# sourceMappingURL=domain-event.base.js.map