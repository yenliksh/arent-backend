import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';

import { ChatMemberOrmEntity } from './chat-member.orm-entity';
import { ContractOrmEntity } from './contract.orm-entity';
import { MessageOrmEntity } from './message.orm-entity';

export class ChatOrmEntity extends ObjectionEntityBase {
  static create(data: Omit<ChatOrmEntity, keyof Model>) {
    return ChatOrmEntity.fromJson(data);
  }

  static tableName = 'chats';

  contractId: string;
  lastMessageId?: string;
  lastOfferMessageId?: string;

  members?: ChatMemberOrmEntity[];
  messages?: MessageOrmEntity[];
  lastMessage?: MessageOrmEntity;
  lastOfferMessage?: MessageOrmEntity;
  contract?: ContractOrmEntity;

  static relationMappings: RelationMappingsThunk = () => {
    return {
      members: {
        relation: Model.HasManyRelation,
        modelClass: ChatMemberOrmEntity,
        join: {
          from: `${ChatOrmEntity.tableName}.id`,
          to: `${ChatMemberOrmEntity.tableName}.chatId`,
        },
      },
      messages: {
        relation: Model.HasManyRelation,
        modelClass: MessageOrmEntity,
        join: {
          from: `${ChatOrmEntity.tableName}.id`,
          to: `${MessageOrmEntity.tableName}.chatId`,
        },
      },
      lastMessage: {
        relation: Model.BelongsToOneRelation,
        modelClass: MessageOrmEntity,
        join: {
          from: `${ChatOrmEntity.tableName}.lastMessageId`,
          to: `${MessageOrmEntity.tableName}.id`,
        },
      },
      contract: {
        relation: Model.BelongsToOneRelation,
        modelClass: ContractOrmEntity,
        join: {
          from: `${ChatOrmEntity.tableName}.contractId`,
          to: `${ContractOrmEntity.tableName}.id`,
        },
      },
    };
  };
}
