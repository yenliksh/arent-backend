"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatEntity = void 0;
const aggregate_root_base_1 = require("../../../../../libs/ddd/domain/base-classes/aggregate-root.base");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const exceptions_1 = require("../../../../../libs/exceptions");
const _ = require("lodash");
const chat_errors_1 = require("../errors/chat.errors");
const types_1 = require("../types");
const chat_member_entity_1 = require("./chat-member.entity");
class ChatEntity extends aggregate_root_base_1.AggregateRoot {
    static create({ contractId, members }) {
        const id = uuid_value_object_1.UUID.generate();
        const props = {
            contractId,
            members: members.map((prop) => chat_member_entity_1.ChatMemberEntity.create({ ...prop, chatId: id })),
            isActive: true,
        };
        const chat = new ChatEntity({ id, props });
        return chat;
    }
    setLastMessageId(lastMessageId) {
        this.props.lastMessageId = lastMessageId;
    }
    setLastOfferMessageId(lastOfferMessageId) {
        this.props.lastOfferMessageId = lastOfferMessageId;
    }
    setLastReadMessageId(messageId, memberId) {
        const chatMemberIndex = this.props.members.findIndex((member) => member.memberId.equals(memberId));
        if (chatMemberIndex < 0) {
            throw new exceptions_1.ArgumentInvalidException('Chat member not exist in this chat');
        }
        this.props.members[chatMemberIndex].setLastReadMessageId(messageId);
    }
    getLastReadMessageId(memberId) {
        const chatMemberIndex = this.props.members.findIndex((member) => member.memberId.equals(memberId));
        if (chatMemberIndex < 0) {
            throw new exceptions_1.ArgumentInvalidException('Chat member not exist in this chat');
        }
        return this.props.members[chatMemberIndex].lastReadMessageId;
    }
    get members() {
        return this.props.members;
    }
    get contractId() {
        return this.props.contractId;
    }
    get id() {
        return this._id;
    }
    get isActive() {
        return this.props.isActive;
    }
    validate() {
        const { contractId, isActive } = this.props;
        const fields = [contractId, isActive];
        if (fields.some((f) => f == null)) {
            throw new chat_errors_1.ChatHasEmptyFieldsError('Chat must to have complete all required fields');
        }
        this.validateChatMembers();
    }
    validateChatMembers() {
        const members = this.props.members ? this.props.members.map((member) => member.getDataForChat()) : [];
        if (members.length > 2) {
            throw new exceptions_1.ArgumentInvalidException('Chat required maximum 2 members');
        }
        const uniqMembers = _.uniq(members.map((member) => member.memberId.value)).length;
        if (members.length !== uniqMembers) {
            throw new exceptions_1.ArgumentInvalidException('Chat member must be uniq');
        }
        if (members.every((member) => member.role !== types_1.UserChatRole.LANDLORD)) {
            throw new exceptions_1.ArgumentInvalidException('Landlord member required');
        }
        if (members.every((member) => member.role !== types_1.UserChatRole.TENANT)) {
            throw new exceptions_1.ArgumentInvalidException('Tenant member required');
        }
    }
}
exports.ChatEntity = ChatEntity;
//# sourceMappingURL=chat.entity.js.map