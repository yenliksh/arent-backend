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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageQueryGraphqlResolver = void 0;
const user_orm_entity_1 = require("../../../../infrastructure/database/entities/user.orm-entity");
const iam_decorator_1 = require("../../../../infrastructure/decorators/iam.decorator");
const guards_1 = require("../../../../infrastructure/guards");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const message_pagination_response_dto_1 = require("../dtos/message-pagination.response.dto");
const chat_messages_request_dto_1 = require("../queries/chat-messages/chat-messages.request.dto");
const chat_messages_service_1 = require("../queries/chat-messages/chat-messages.service");
let MessageQueryGraphqlResolver = class MessageQueryGraphqlResolver {
    constructor(chatMessagesService) {
        this.chatMessagesService = chatMessagesService;
    }
    async getChatMessages(iam, input) {
        const result = await this.chatMessagesService.handle(input, iam.id);
        return message_pagination_response_dto_1.MessagePaginationResponse.create(result.unwrap());
    }
};
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Query)(() => message_pagination_response_dto_1.MessagePaginationResponse, { name: 'chat__messages' }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity,
        chat_messages_request_dto_1.ChatMessagesRequest]),
    __metadata("design:returntype", Promise)
], MessageQueryGraphqlResolver.prototype, "getChatMessages", null);
MessageQueryGraphqlResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [chat_messages_service_1.ChatMessagesService])
], MessageQueryGraphqlResolver);
exports.MessageQueryGraphqlResolver = MessageQueryGraphqlResolver;
//# sourceMappingURL=message.query.resolver.js.map