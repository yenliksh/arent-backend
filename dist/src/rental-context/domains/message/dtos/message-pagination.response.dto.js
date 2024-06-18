"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MessagePaginationResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagePaginationResponse = void 0;
const openapi = require("@nestjs/swagger");
const base_cursor_pagination_response_1 = require("../../../../infrastructure/dto/base-cursor-pagination.response");
const graphql_1 = require("@nestjs/graphql");
const message_model_1 = require("../models/message.model");
let MessagePaginationResponse = MessagePaginationResponse_1 = class MessagePaginationResponse extends (0, base_cursor_pagination_response_1.BaseBeforeCursorPaginationResponse)(message_model_1.MessageModel) {
    static create(props) {
        const payload = new MessagePaginationResponse_1();
        payload.data = props.data.map(message_model_1.MessageModel.create);
        payload.pageInfo = props.pageInfo;
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
};
MessagePaginationResponse = MessagePaginationResponse_1 = __decorate([
    (0, graphql_1.ObjectType)('MessagePayload')
], MessagePaginationResponse);
exports.MessagePaginationResponse = MessagePaginationResponse;
//# sourceMappingURL=message-pagination.response.dto.js.map