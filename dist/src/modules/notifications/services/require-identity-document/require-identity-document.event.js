"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireIdentityDocumentEvent = void 0;
const types_1 = require("../../types");
class RequireIdentityDocumentEvent {
    static create(props) {
        const payload = new RequireIdentityDocumentEvent();
        Object.assign(payload, props);
        return payload;
    }
}
exports.RequireIdentityDocumentEvent = RequireIdentityDocumentEvent;
RequireIdentityDocumentEvent.eventName = types_1.NotificationEventTypes.REQUIRE_IDENTITY_DOCUMENT;
//# sourceMappingURL=require-identity-document.event.js.map