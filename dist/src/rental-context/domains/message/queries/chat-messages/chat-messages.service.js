"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessagesService = void 0;
const chat_member_orm_entity_1 = require("../../../../../infrastructure/database/entities/chat-member.orm-entity");
const chat_orm_entity_1 = require("../../../../../infrastructure/database/entities/chat.orm-entity");
const message_orm_entity_1 = require("../../../../../infrastructure/database/entities/message.orm-entity");
const cursor_paginator_1 = require("../../../../../libs/utils/cursor-paginator");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let ChatMessagesService = class ChatMessagesService {
    async handle(dto, userId) {
        const { chatId, beforeCursor, limit = 20 } = dto;
        const cursorBefore = beforeCursor
            ? (0, cursor_paginator_1.decodeCursor)(beforeCursor)
            : undefined;
        const chatMemberSubQuery = chat_member_orm_entity_1.ChatMemberOrmEntity.query().where({ memberId: userId });
        const chatSubQuery = chat_member_orm_entity_1.ChatMemberOrmEntity.relatedQuery('chat').for(chatMemberSubQuery).findById(chatId);
        const messageQb = chat_orm_entity_1.ChatOrmEntity.relatedQuery('messages')
            .for(chatSubQuery)
            .limit(limit + 1)
            .orderBy([
            { column: 'createdAt', order: 'DESC' },
            {
                column: 'id',
                order: 'DESC',
            },
        ]);
        if (cursorBefore) {
            messageQb.andWhere((builder) => {
                builder
                    .whereRaw(`${message_orm_entity_1.MessageOrmEntity.tableName}."createdAt"::timestamptz < '${cursorBefore.createdAt}'::timestamptz`)
                    .orWhereRaw(`${message_orm_entity_1.MessageOrmEntity.tableName}."createdAt"::timestamptz = '${cursorBefore.createdAt}'::timestamptz
            AND ${message_orm_entity_1.MessageOrmEntity.tableName}."id" < '${cursorBefore.id}'`);
            });
        }
        const messages = await messageQb;
        const returningData = (0, cursor_paginator_1.getDataWithBeforeCursor)(messages, limit, (i) => i, null, [
            'id',
            'createdAt',
        ]);
        return (0, oxide_ts_1.Ok)(returningData);
    }
};
ChatMessagesService = __decorate([
    (0, common_1.Injectable)()
], ChatMessagesService);
exports.ChatMessagesService = ChatMessagesService;
//# sourceMappingURL=chat-messages.service.js.map