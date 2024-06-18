import { UserChatRole } from '@domains/chat/domain/types';
import { ChatMemberOrmEntity } from '@infrastructure/database/entities/chat-member.orm-entity';
import { Model } from 'objection';
declare type IChatMember = Omit<ChatMemberOrmEntity, keyof Model>;
export declare class ChatMemberTypeormEntity implements IChatMember {
    id: string;
    chatId: string;
    memberId: string;
    role: UserChatRole;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
export {};
