import { Entity } from '@libs/ddd/domain/base-classes/entity.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

import { ChatMemberHasEmptyFieldsError } from '../errors/chat-member.errors';
import { UserChatRole } from '../types';

export interface CreateChatMemberProps {
  chatId: UUID;
  memberId: UUID;
  role: UserChatRole;
}

export type ChatMemberProps = CreateChatMemberProps & {
  lastReadMessageId?: UUID;
};

export class ChatMemberEntity extends Entity<ChatMemberProps> {
  protected readonly _id: UUID;

  static create({ chatId, role, memberId }: CreateChatMemberProps): ChatMemberEntity {
    const id = UUID.generate();

    const props: ChatMemberProps = {
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

  setLastReadMessageId(id: UUID) {
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

  validate(): void {
    const { chatId, role, memberId } = this.props;

    const fields = [chatId, role, memberId];

    if (fields.some((f) => f == null)) {
      throw new ChatMemberHasEmptyFieldsError('Chat user must to have complete all required fields');
    }
  }
}
