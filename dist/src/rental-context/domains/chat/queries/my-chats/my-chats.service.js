"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyChatsService = void 0;
const chat_member_orm_entity_1 = require("../../../../../infrastructure/database/entities/chat-member.orm-entity");
const chat_orm_entity_1 = require("../../../../../infrastructure/database/entities/chat.orm-entity");
const cursor_paginator_1 = require("../../../../../libs/utils/cursor-paginator");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let MyChatsService = class MyChatsService {
    async handle(userId, input) {
        const { role, filter, afterCursor, limit = 20 } = input;
        const cursorAfter = afterCursor ? (0, cursor_paginator_1.decodeCursor)(afterCursor) : undefined;
        const filterChatMemberSubQuery = chat_member_orm_entity_1.ChatMemberOrmEntity.query();
        if (filter) {
            filterChatMemberSubQuery
                .innerJoinRelated({ user: true })
                .whereNot({ memberId: userId })
                .where('firstName', 'ILIKE', `%${filter}%`);
        }
        const chatsQb = chat_member_orm_entity_1.ChatMemberOrmEntity.relatedQuery('chat')
            .for(filterChatMemberSubQuery)
            .innerJoinRelated({ members: true })
            .whereRaw(`members."memberId" = '${userId}' AND members."role" = '${role}'`)
            .limit(limit + 1)
            .orderBy([
            { column: 'updatedAt', order: 'DESC' },
            { column: 'contractId', order: 'DESC' },
        ]);
        if (cursorAfter) {
            chatsQb.andWhere((builder) => {
                builder
                    .whereRaw(`${chat_orm_entity_1.ChatOrmEntity.tableName}."updatedAt"::timestamptz < '${cursorAfter.updatedAt}'::timestamptz`)
                    .orWhereRaw(`(${chat_orm_entity_1.ChatOrmEntity.tableName}."updatedAt"::timestamptz = '${cursorAfter.updatedAt}'::timestamptz)
            AND (${chat_orm_entity_1.ChatOrmEntity.tableName}."contractId" < '${cursorAfter.contractId}')`);
            });
        }
        const chats = await chatsQb;
        const returningData = (0, cursor_paginator_1.getDataWithAfterCursor)(chats, limit, (i) => i, null, [
            'contractId',
            'updatedAt',
        ]);
        return (0, oxide_ts_1.Ok)(returningData);
    }
};
MyChatsService = __decorate([
    (0, common_1.Injectable)()
], MyChatsService);
exports.MyChatsService = MyChatsService;
//# sourceMappingURL=my-chats.service.js.map