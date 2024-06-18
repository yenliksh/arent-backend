"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewMessageEvent = void 0;
const types_1 = require("../../types");
class NewMessageEvent {
    static create(props) {
        const payload = new NewMessageEvent();
        Object.assign(payload, props);
        return payload;
    }
}
exports.NewMessageEvent = NewMessageEvent;
NewMessageEvent.eventName = types_1.NotificationEventTypes.NEW_MESSAGE;
//# sourceMappingURL=new-message.event.js.map