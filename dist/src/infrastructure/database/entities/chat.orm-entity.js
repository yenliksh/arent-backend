"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatOrmEntity = void 0;
const objection_entity_base_1 = require("../../../libs/ddd/infrastructure/database/objection.entity.base");
const objection_1 = require("objection");
const chat_member_orm_entity_1 = require("./chat-member.orm-entity");
const contract_orm_entity_1 = require("./contract.orm-entity");
const message_orm_entity_1 = require("./message.orm-entity");
class ChatOrmEntity extends objection_entity_base_1.ObjectionEntityBase {
    static create(data) {
        return ChatOrmEntity.fromJson(data);
    }
}
exports.ChatOrmEntity = ChatOrmEntity;
ChatOrmEntity.tableName = 'chats';
ChatOrmEntity.relationMappings = () => {
    return {
        members: {
            relation: objection_1.Model.HasManyRelation,
            modelClass: chat_member_orm_entity_1.ChatMemberOrmEntity,
            join: {
                from: `${ChatOrmEntity.tableName}.id`,
                to: `${chat_member_orm_entity_1.ChatMemberOrmEntity.tableName}.chatId`,
            },
        },
        messages: {
            relation: objection_1.Model.HasManyRelation,
            modelClass: message_orm_entity_1.MessageOrmEntity,
            join: {
                from: `${ChatOrmEntity.tableName}.id`,
                to: `${message_orm_entity_1.MessageOrmEntity.tableName}.chatId`,
            },
        },
        lastMessage: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: message_orm_entity_1.MessageOrmEntity,
            join: {
                from: `${ChatOrmEntity.tableName}.lastMessageId`,
                to: `${message_orm_entity_1.MessageOrmEntity.tableName}.id`,
            },
        },
        contract: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: contract_orm_entity_1.ContractOrmEntity,
            join: {
                from: `${ChatOrmEntity.tableName}.contractId`,
                to: `${contract_orm_entity_1.ContractOrmEntity.tableName}.id`,
            },
        },
    };
};
//# sourceMappingURL=chat.orm-entity.js.map