import { ChatMemberEntity } from '@domains/chat/domain/entities/chat-member.entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

import { NotificationEventTypes } from '../../types';

export class NewMessageEvent {
  senderId: UUID;
  chatMembers: ChatMemberEntity[];
  chatId: UUID;

  static eventName = NotificationEventTypes.NEW_MESSAGE;

  static create(props: NewMessageEvent) {
    const payload = new NewMessageEvent();

    Object.assign(payload, props);

    return payload;
  }
}
