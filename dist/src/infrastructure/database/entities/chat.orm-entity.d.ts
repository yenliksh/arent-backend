import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';
import { ChatMemberOrmEntity } from './chat-member.orm-entity';
import { ContractOrmEntity } from './contract.orm-entity';
import { MessageOrmEntity } from './message.orm-entity';
export declare class ChatOrmEntity extends ObjectionEntityBase {
    static create(data: Omit<ChatOrmEntity, keyof Model>): ChatOrmEntity;
    static tableName: string;
    contractId: string;
    lastMessageId?: string;
    lastOfferMessageId?: string;
    members?: ChatMemberOrmEntity[];
    messages?: MessageOrmEntity[];
    lastMessage?: MessageOrmEntity;
    lastOfferMessage?: MessageOrmEntity;
    contract?: ContractOrmEntity;
    static relationMappings: RelationMappingsThunk;
}
