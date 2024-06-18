"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageOrmEntity = void 0;
const objection_entity_base_1 = require("../../../libs/ddd/infrastructure/database/objection.entity.base");
const objection_1 = require("objection");
const chat_orm_entity_1 = require("./chat.orm-entity");
class MessageOrmEntity extends objection_entity_base_1.ObjectionEntityBase {
    static create(data) {
        return MessageOrmEntity.fromJson(data);
    }
}
exports.MessageOrmEntity = MessageOrmEntity;
MessageOrmEntity.tableName = 'messages';
MessageOrmEntity.relationMappings = () => {
    return {
        chat: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: chat_orm_entity_1.ChatOrmEntity,
            join: {
                from: `${MessageOrmEntity.tableName}.chatId`,
                to: `${chat_orm_entity_1.ChatOrmEntity.tableName}.id`,
            },
        },
    };
};
//# sourceMappingURL=message.orm-entity.js.map