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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessagesRequest = void 0;
const openapi = require("@nestjs/swagger");
const base_cursor_pagination_request_dto_1 = require("../../../../../infrastructure/inputs/base-cursor-pagination.request.dto");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let ChatMessagesRequest = class ChatMessagesRequest extends base_cursor_pagination_request_dto_1.BaseBeforeCursorPaginateRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { chatId: { required: true, type: () => String } };
    }
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ChatMessagesRequest.prototype, "chatId", void 0);
ChatMessagesRequest = __decorate([
    (0, graphql_1.InputType)()
], ChatMessagesRequest);
exports.ChatMessagesRequest = ChatMessagesRequest;
//# sourceMappingURL=chat-messages.request.dto.js.map