"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMemberOrmEntity = void 0;
const objection_entity_base_1 = require("../../../libs/ddd/infrastructure/database/objection.entity.base");
const objection_1 = require("objection");
const chat_orm_entity_1 = require("./chat.orm-entity");
const message_orm_entity_1 = require("./message.orm-entity");
const user_orm_entity_1 = require("./user.orm-entity");
class ChatMemberOrmEntity extends objection_entity_base_1.ObjectionEntityBase {
    static create(data) {
        return ChatMemberOrmEntity.fromJson(data);
    }
}
exports.ChatMemberOrmEntity = ChatMemberOrmEntity;
ChatMemberOrmEntity.tableName = 'chat_members';
ChatMemberOrmEntity.relationMappings = () => {
    return {
        chat: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: chat_orm_entity_1.ChatOrmEntity,
            join: {
                from: `${ChatMemberOrmEntity.tableName}.chatId`,
                to: `${chat_orm_entity_1.ChatOrmEntity.tableName}.id`,
            },
        },
        user: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: user_orm_entity_1.UserOrmEntity,
            join: {
                from: `${ChatMemberOrmEntity.tableName}.memberId`,
                to: `${user_orm_entity_1.UserOrmEntity.tableName}.id`,
            },
        },
        lastReadMessage: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: message_orm_entity_1.MessageOrmEntity,
            join: {
                from: `${ChatMemberOrmEntity.tableName}.lastReadMessageId`,
                to: `${message_orm_entity_1.MessageOrmEntity.tableName}.id`,
            },
        },
    };
};
//# sourceMappingURL=chat-member.orm-entity.js.map