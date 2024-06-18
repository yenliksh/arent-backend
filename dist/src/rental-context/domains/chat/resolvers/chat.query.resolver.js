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
exports.ChatQueryGraphqlResolver = void 0;
const user_orm_entity_1 = require("../../../../infrastructure/database/entities/user.orm-entity");
const iam_decorator_1 = require("../../../../infrastructure/decorators/iam.decorator");
const guards_1 = require("../../../../infrastructure/guards");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const chat_pagination_response_1 = require("../dtos/chat-pagination.response");
const chat_model_1 = require("../models/chat.model");
const find_chat_request_1 = require("../queries/find-chat/find-chat.request");
const find_chat_service_1 = require("../queries/find-chat/find-chat.service");
const is_chats_exist_service_1 = require("../queries/is-chats-exist/is-chats-exist.service");
const my_chats_request_dto_1 = require("../queries/my-chats/my-chats.request.dto");
const my_chats_service_1 = require("../queries/my-chats/my-chats.service");
let ChatQueryGraphqlResolver = class ChatQueryGraphqlResolver {
    constructor(myChatsService, findChatService, isChatsExistService) {
        this.myChatsService = myChatsService;
        this.findChatService = findChatService;
        this.isChatsExistService = isChatsExistService;
    }
    async myChats(iam, input) {
        const [result, isChatsExist] = await Promise.all([
            this.myChatsService.handle(iam.id, input),
            this.isChatsExistService.handle(iam.id, input),
        ]);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return chat_pagination_response_1.ChatPaginationResponse.create(result.unwrap(), isChatsExist.unwrap());
    }
    async chatById(iam, input) {
        const result = await this.findChatService.handle(input, iam.id);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return chat_model_1.ChatModel.create(result.unwrap());
    }
};
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Query)(() => chat_pagination_response_1.ChatPaginationResponse, { name: 'chat__myChats' }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity, my_chats_request_dto_1.MyChatsRequest]),
    __metadata("design:returntype", Promise)
], ChatQueryGraphqlResolver.prototype, "myChats", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Query)(() => chat_model_1.ChatModel, { name: 'chat__byId' }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity, find_chat_request_1.FindChatRequest]),
    __metadata("design:returntype", Promise)
], ChatQueryGraphqlResolver.prototype, "chatById", null);
ChatQueryGraphqlResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [my_chats_service_1.MyChatsService,
        find_chat_service_1.FindChatService,
        is_chats_exist_service_1.IsChatsExistService])
], ChatQueryGraphqlResolver);
exports.ChatQueryGraphqlResolver = ChatQueryGraphqlResolver;
//# sourceMappingURL=chat.query.resolver.js.map