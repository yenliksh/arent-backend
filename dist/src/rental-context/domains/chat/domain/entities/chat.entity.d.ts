import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { MessageEntity } from 'src/rental-context/domains/message/domain/entities/message.entity';
import { ChatMemberEntity, CreateChatMemberProps } from './chat-member.entity';
export interface CreateChatProps {
    contractId: UUID;
    members: Omit<CreateChatMemberProps, 'chatId'>[];
}
export declare type ChatProps = Omit<CreateChatProps, 'members'> & {
    members: ChatMemberEntity[];
    messages?: MessageEntity[];
    lastMessageId?: UUID;
    lastOfferMessageId?: UUID;
    isActive: boolean;
};
export declare class ChatEntity extends AggregateRoot<ChatProps> {
    protected readonly _id: UUID;
    static create({ contractId, members }: CreateChatProps): ChatEntity;
    setLastMessageId(lastMessageId?: UUID): void;
    setLastOfferMessageId(lastOfferMessageId?: UUID): void;
    setLastReadMessageId(messageId: UUID, memberId: UUID): void;
    getLastReadMessageId(memberId: UUID): UUID | undefined;
    get members(): ChatMemberEntity[];
    get contractId(): UUID;
    get id(): UUID;
    get isActive(): boolean;
    validate(): void;
    private validateChatMembers;
}
