"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageStatus = exports.SystemMessageType = exports.MessageType = void 0;
const graphql_1 = require("@nestjs/graphql");
var MessageType;
(function (MessageType) {
    MessageType["TEXT"] = "TEXT";
    MessageType["MEDIA"] = "MEDIA";
    MessageType["SYSTEM"] = "SYSTEM";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
(0, graphql_1.registerEnumType)(MessageType, {
    name: 'MessageType',
});
var SystemMessageType;
(function (SystemMessageType) {
    SystemMessageType["OFFER_REJECTED"] = "OFFER_REJECTED";
    SystemMessageType["OFFER_REJECTED_BY_SYSTEM"] = "OFFER_REJECTED_BY_SYSTEM";
    SystemMessageType["INSTANT_BOOKING"] = "INSTANT_BOOKING";
    SystemMessageType["BOOKING_CONCLUDED"] = "BOOKING_CONCLUDED";
    SystemMessageType["BOOKING_CREATED"] = "BOOKING_CREATED";
    SystemMessageType["OFFER_SENDING"] = "OFFER_SENDING";
    SystemMessageType["TEMPORARY_BOOKING_REVOKE"] = "TEMPORARY_BOOKING_REVOKE";
})(SystemMessageType = exports.SystemMessageType || (exports.SystemMessageType = {}));
(0, graphql_1.registerEnumType)(SystemMessageType, {
    name: 'SystemMessageType',
});
var MessageStatus;
(function (MessageStatus) {
    MessageStatus["SENT"] = "SENT";
    MessageStatus["WAITING"] = "WAITING";
    MessageStatus["FAILED"] = "FAILED";
})(MessageStatus = exports.MessageStatus || (exports.MessageStatus = {}));
(0, graphql_1.registerEnumType)(MessageStatus, {
    name: 'MessageStatus',
});
//# sourceMappingURL=types.js.map