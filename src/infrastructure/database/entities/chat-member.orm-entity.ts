import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';
import { UserChatRole } from 'src/rental-context/domains/chat/domain/types';

import { ChatOrmEntity } from './chat.orm-entity';
import { MessageOrmEntity } from './message.orm-entity';
import { UserOrmEntity } from './user.orm-entity';

export class ChatMemberOrmEntity extends ObjectionEntityBase {
  static create(data: Omit<ChatMemberOrmEntity, keyof Model>) {
    return ChatMemberOrmEntity.fromJson(data);
  }

  static tableName = 'chat_members';

  chatId: string;
  memberId: string;
  role: UserChatRole;
  lastReadMessageId?: string;

  chat?: ChatOrmEntity;
  user?: UserOrmEntity;
  lastReadMessage?: MessageOrmEntity;

  static relationMappings: RelationMappingsThunk = () => {
    return {
      chat: {
        relation: Model.BelongsToOneRelation,
        modelClass: ChatOrmEntity,
        join: {
          from: `${ChatMemberOrmEntity.tableName}.chatId`,
          to: `${ChatOrmEntity.tableName}.id`,
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserOrmEntity,
        join: {
          from: `${ChatMemberOrmEntity.tableName}.memberId`,
          to: `${UserOrmEntity.tableName}.id`,
        },
      },
      lastReadMessage: {
        relation: Model.BelongsToOneRelation,
        modelClass: MessageOrmEntity,
        join: {
          from: `${ChatMemberOrmEntity.tableName}.lastReadMessageId`,
          to: `${MessageOrmEntity.tableName}.id`,
        },
      },
    };
  };
}
