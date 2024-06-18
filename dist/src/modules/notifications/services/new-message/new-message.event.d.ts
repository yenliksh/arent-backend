import { ChatMemberEntity } from '@domains/chat/domain/entities/chat-member.entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { NotificationEventTypes } from '../../types';
export declare class NewMessageEvent {
    senderId: UUID;
    chatMembers: ChatMemberEntity[];
    chatId: UUID;
    static eventName: NotificationEventTypes;
    static create(props: NewMessageEvent): NewMessageEvent;
}
