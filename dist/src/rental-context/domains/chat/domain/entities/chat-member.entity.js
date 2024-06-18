"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMemberEntity = void 0;
const entity_base_1 = require("../../../../../libs/ddd/domain/base-classes/entity.base");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const chat_member_errors_1 = require("../errors/chat-member.errors");
class ChatMemberEntity extends entity_base_1.Entity {
    static create({ chatId, role, memberId }) {
        const id = uuid_value_object_1.UUID.generate();
        const props = {
            chatId,
            role,
            memberId,
        };
        const contractOffer = new ChatMemberEntity({ id, props });
        return contractOffer;
    }
    getDataForChat() {
        const { memberId, role } = this.props;
        return { memberId, role };
    }
    setLastReadMessageId(id) {
        this.props.lastReadMessageId = id;
    }
    get memberId() {
        return this.props.memberId;
    }
    get role() {
        return this.props.role;
    }
    get lastReadMessageId() {
        return this.props.lastReadMessageId;
    }
    validate() {
        const { chatId, role, memberId } = this.props;
        const fields = [chatId, role, memberId];
        if (fields.some((f) => f == null)) {
            throw new chat_member_errors_1.ChatMemberHasEmptyFieldsError('Chat user must to have complete all required fields');
        }
    }
}
exports.ChatMemberEntity = ChatMemberEntity;
//# sourceMappingURL=chat-member.entity.js.map