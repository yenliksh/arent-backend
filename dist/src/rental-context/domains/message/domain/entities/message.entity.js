"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEntity = void 0;
const aggregate_root_base_1 = require("../../../../../libs/ddd/domain/base-classes/aggregate-root.base");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const exceptions_1 = require("../../../../../libs/exceptions");
const message_errors_1 = require("../errors/message.errors");
const types_1 = require("../types");
const media_message_value_object_1 = require("../value-objects/media-message.value-object");
const system_message_value_object_1 = require("../value-objects/system-message.value-object");
const text_message_value_object_1 = require("../value-objects/text-message.value-object");
class MessageEntity extends aggregate_root_base_1.AggregateRoot {
    static create({ id, chatId, senderId, type, text, media, system }) {
        if (!id) {
            id = uuid_value_object_1.UUID.generate();
        }
        const props = {
            status: types_1.MessageStatus.SENT,
            chatId,
            senderId,
            type,
            text: text ? text_message_value_object_1.TextMessageVO.create(text) : undefined,
            media: media ? media_message_value_object_1.MediaMessageVO.create(media) : undefined,
            system: system ? system_message_value_object_1.SystemMessageVO.create(system) : undefined,
        };
        const message = new MessageEntity({ id: id !== null && id !== void 0 ? id : uuid_value_object_1.UUID.generate(), props });
        return message;
    }
    get id() {
        return this._id;
    }
    validate() {
        const { chatId, senderId, type, text, media, system } = this.props;
        const fields = [chatId, type, senderId];
        if (fields.some((f) => f == null)) {
            throw new message_errors_1.MessageHasEmptyFieldsError('All required fields must be filled in the message');
        }
        if (type === types_1.MessageType.TEXT && (!text || media || system)) {
            throw new exceptions_1.ArgumentInvalidException('Text message should has text only');
        }
        if (type === types_1.MessageType.MEDIA && (text || !media || system)) {
            throw new exceptions_1.ArgumentInvalidException('Media message should has media only');
        }
        if (type === types_1.MessageType.SYSTEM && (text || media || !system)) {
            throw new exceptions_1.ArgumentInvalidException('System message should has system only');
        }
    }
}
exports.MessageEntity = MessageEntity;
//# sourceMappingURL=message.entity.js.map