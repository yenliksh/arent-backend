import { Entity } from '@libs/ddd/domain/base-classes/entity.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { UserChatRole } from '../types';
export interface CreateChatMemberProps {
    chatId: UUID;
    memberId: UUID;
    role: UserChatRole;
}
export declare type ChatMemberProps = CreateChatMemberProps & {
    lastReadMessageId?: UUID;
};
export declare class ChatMemberEntity extends Entity<ChatMemberProps> {
    protected readonly _id: UUID;
    static create({ chatId, role, memberId }: CreateChatMemberProps): ChatMemberEntity;
    getDataForChat(): {
        memberId: UUID;
        role: UserChatRole;
    };
    setLastReadMessageId(id: UUID): void;
    get memberId(): UUID;
    get role(): UserChatRole;
    get lastReadMessageId(): UUID | undefined;
    validate(): void;
}
