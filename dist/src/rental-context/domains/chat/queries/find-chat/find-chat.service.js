"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindChatService = void 0;
const chat_member_orm_entity_1 = require("../../../../../infrastructure/database/entities/chat-member.orm-entity");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let FindChatService = class FindChatService {
    async handle(dto, userId) {
        const { id } = dto;
        const chatMembersSubQuery = chat_member_orm_entity_1.ChatMemberOrmEntity.query().where({ chatId: id, memberId: userId });
        const chat = await chat_member_orm_entity_1.ChatMemberOrmEntity.relatedQuery('chat').for(chatMembersSubQuery).findById(id);
        if (!chat) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Chat not found'));
        }
        return (0, oxide_ts_1.Ok)(chat);
    }
};
FindChatService = __decorate([
    (0, common_1.Injectable)()
], FindChatService);
exports.FindChatService = FindChatService;
//# sourceMappingURL=find-chat.service.js.map