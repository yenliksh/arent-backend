import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';
import { UserChatRole } from 'src/rental-context/domains/chat/domain/types';
import { ChatOrmEntity } from './chat.orm-entity';
import { MessageOrmEntity } from './message.orm-entity';
import { UserOrmEntity } from './user.orm-entity';
export declare class ChatMemberOrmEntity extends ObjectionEntityBase {
    static create(data: Omit<ChatMemberOrmEntity, keyof Model>): ChatMemberOrmEntity;
    static tableName: string;
    chatId: string;
    memberId: string;
    role: UserChatRole;
    lastReadMessageId?: string;
    chat?: ChatOrmEntity;
    user?: UserOrmEntity;
    lastReadMessage?: MessageOrmEntity;
    static relationMappings: RelationMappingsThunk;
}
