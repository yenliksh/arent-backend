import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import * as _ from 'lodash';
import { MessageEntity } from 'src/rental-context/domains/message/domain/entities/message.entity';

import { ChatHasEmptyFieldsError } from '../errors/chat.errors';
import { UserChatRole } from '../types';
import { ChatMemberEntity, CreateChatMemberProps } from './chat-member.entity';

export interface CreateChatProps {
  contractId: UUID;
  members: Omit<CreateChatMemberProps, 'chatId'>[];
}

export type ChatProps = Omit<CreateChatProps, 'members'> & {
  members: ChatMemberEntity[];
  messages?: MessageEntity[];
  lastMessageId?: UUID;
  lastOfferMessageId?: UUID;
  isActive: boolean;
};

export class ChatEntity extends AggregateRoot<ChatProps> {
  protected readonly _id: UUID;

  static create({ contractId, members }: CreateChatProps): ChatEntity {
    const id = UUID.generate();

    const props: ChatProps = {
      contractId,
      members: members.map((prop) => ChatMemberEntity.create({ ...prop, chatId: id })),
      isActive: true,
    };

    const chat = new ChatEntity({ id, props });

    return chat;
  }

  setLastMessageId(lastMessageId?: UUID) {
    this.props.lastMessageId = lastMessageId;
  }

  setLastOfferMessageId(lastOfferMessageId?: UUID) {
    this.props.lastOfferMessageId = lastOfferMessageId;
  }

  setLastReadMessageId(messageId: UUID, memberId: UUID) {
    const chatMemberIndex = this.props.members.findIndex((member) => member.memberId.equals(memberId));

    if (chatMemberIndex < 0) {
      throw new ArgumentInvalidException('Chat member not exist in this chat');
    }

    this.props.members[chatMemberIndex].setLastReadMessageId(messageId);
  }

  getLastReadMessageId(memberId: UUID) {
    const chatMemberIndex = this.props.members.findIndex((member) => member.memberId.equals(memberId));

    if (chatMemberIndex < 0) {
      throw new ArgumentInvalidException('Chat member not exist in this chat');
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

  validate(): void {
    const { contractId, isActive } = this.props;

    const fields = [contractId, isActive];

    if (fields.some((f) => f == null)) {
      throw new ChatHasEmptyFieldsError('Chat must to have complete all required fields');
    }

    this.validateChatMembers();
  }

  private validateChatMembers() {
    const members = this.props.members ? this.props.members.map((member) => member.getDataForChat()) : [];

    if (members.length > 2) {
      throw new ArgumentInvalidException('Chat required maximum 2 members');
    }
    const uniqMembers = _.uniq(members.map((member) => member.memberId.value)).length;
    if (members.length !== uniqMembers) {
      throw new ArgumentInvalidException('Chat member must be uniq');
    }
    if (members.every((member) => member.role !== UserChatRole.LANDLORD)) {
      throw new ArgumentInvalidException('Landlord member required');
    }
    if (members.every((member) => member.role !== UserChatRole.TENANT)) {
      throw new ArgumentInvalidException('Tenant member required');
    }
  }
}
