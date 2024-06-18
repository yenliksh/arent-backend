"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ChatPaginationResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatPaginationResponse = void 0;
const base_cursor_pagination_response_1 = require("../../../../infrastructure/dto/base-cursor-pagination.response");
const graphql_1 = require("@nestjs/graphql");
const chat_model_1 = require("../models/chat.model");
let ChatPaginationResponse = ChatPaginationResponse_1 = class ChatPaginationResponse extends (0, base_cursor_pagination_response_1.BaseAfterCursorPaginationResponse)(chat_model_1.ChatModel) {
    static create(props, isChatsExist) {
        const payload = new ChatPaginationResponse_1();
        payload.data = props.data.map(chat_model_1.ChatModel.create);
        payload.pageInfo = props.pageInfo;
        payload.isChatsExist = isChatsExist;
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], ChatPaginationResponse.prototype, "isChatsExist", void 0);
ChatPaginationResponse = ChatPaginationResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], ChatPaginationResponse);
exports.ChatPaginationResponse = ChatPaginationResponse;
//# sourceMappingURL=chat-pagination.response.js.map