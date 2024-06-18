"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnreadMessageCountLoader = void 0;
const chat_member_orm_entity_1 = require("../../../../infrastructure/database/entities/chat-member.orm-entity");
const message_orm_entity_1 = require("../../../../infrastructure/database/entities/message.orm-entity");
const base64_1 = require("../../../../libs/utils/base64");
const common_1 = require("@nestjs/common");
const DataLoader = require("dataloader");
let UnreadMessageCountLoader = class UnreadMessageCountLoader {
    generateDataLoader() {
        return new DataLoader(async (base64Props) => {
            const props = base64Props.map((base64_1.decodeBase64));
            const lastReadMessagesQb = chat_member_orm_entity_1.ChatMemberOrmEntity.query()
                .withGraphFetched({ lastReadMessage: true }, { joinOperation: 'leftJoin' })
                .modifyGraph('lastReadMessage', (builder) => builder.select('createdAt'));
            props.map((prop) => lastReadMessagesQb.orWhere({ chatId: prop.chatId, memberId: prop.userId }));
            const chatMembers = await lastReadMessagesQb;
            const messagesQb = message_orm_entity_1.MessageOrmEntity.query()
                .groupBy('chatId')
                .orderByRaw(`MAX("createdAt") DESC`)
                .count()
                .select('chatId');
            chatMembers.map((member) => messagesQb.orWhere((builder) => {
                var _a;
                const createdAt = (_a = member.lastReadMessage) === null || _a === void 0 ? void 0 : _a.createdAt.toISOString();
                builder.where({ chatId: member.chatId });
                if (createdAt) {
                    builder.where((builder) => {
                        builder.whereRaw(`${message_orm_entity_1.MessageOrmEntity.tableName}."createdAt"::timestamptz > '${createdAt}'::timestamptz`);
                    });
                }
            }));
            const unreadMessages = (await messagesQb);
            return base64Props.map((base64Prop) => {
                var _a;
                const { chatId } = (0, base64_1.decodeBase64)(base64Prop);
                const count = (_a = unreadMessages.find((message) => message.chatId === chatId)) === null || _a === void 0 ? void 0 : _a.count;
                return count ? Number(count) : undefined;
            });
        });
    }
};
UnreadMessageCountLoader = __decorate([
    (0, common_1.Injectable)()
], UnreadMessageCountLoader);
exports.UnreadMessageCountLoader = UnreadMessageCountLoader;
//# sourceMappingURL=unread-message-count.dataloader.js.map