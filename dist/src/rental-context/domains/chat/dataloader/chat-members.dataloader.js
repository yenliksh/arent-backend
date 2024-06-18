"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMembersLoader = void 0;
const chat_member_orm_entity_1 = require("../../../../infrastructure/database/entities/chat-member.orm-entity");
const common_1 = require("@nestjs/common");
const DataLoader = require("dataloader");
let ChatMembersLoader = class ChatMembersLoader {
    generateDataLoader() {
        return new DataLoader(async (chatIds) => {
            const chatMembersSubQuery = chat_member_orm_entity_1.ChatMemberOrmEntity.query().whereIn('chatId', chatIds);
            const members = await chat_member_orm_entity_1.ChatMemberOrmEntity.relatedQuery('user')
                .for(chatMembersSubQuery)
                .withGraphFetched({ chatMembers: true })
                .modifyGraph('chatMembers', (builder) => {
                builder.whereIn('chatId', chatIds);
            });
            return chatIds.map((id) => members.filter((member) => { var _a; return (_a = member.chatMembers) === null || _a === void 0 ? void 0 : _a.some((chatMember) => chatMember.chatId === id); }));
        });
    }
};
ChatMembersLoader = __decorate([
    (0, common_1.Injectable)()
], ChatMembersLoader);
exports.ChatMembersLoader = ChatMembersLoader;
//# sourceMappingURL=chat-members.dataloader.js.map