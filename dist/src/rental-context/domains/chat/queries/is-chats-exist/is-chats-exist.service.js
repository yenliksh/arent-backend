"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsChatsExistService = void 0;
const chat_member_orm_entity_1 = require("../../../../../infrastructure/database/entities/chat-member.orm-entity");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let IsChatsExistService = class IsChatsExistService {
    async handle(userId, input) {
        const { role } = input;
        const filterChatMemberSubQuery = chat_member_orm_entity_1.ChatMemberOrmEntity.query().where({ memberId: userId, role });
        const chat = await chat_member_orm_entity_1.ChatMemberOrmEntity.relatedQuery('chat').for(filterChatMemberSubQuery).limit(1).first();
        return (0, oxide_ts_1.Ok)(!!chat);
    }
};
IsChatsExistService = __decorate([
    (0, common_1.Injectable)()
], IsChatsExistService);
exports.IsChatsExistService = IsChatsExistService;
//# sourceMappingURL=is-chats-exist.service.js.map