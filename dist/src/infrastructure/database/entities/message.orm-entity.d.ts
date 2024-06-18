import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';
import { ISystemMessageOrmData, MessageStatus, MessageType, SystemMessageType } from 'src/rental-context/domains/message/domain/types';
import { ChatOrmEntity } from './chat.orm-entity';
export declare class MessageOrmEntity extends ObjectionEntityBase {
    static create(data: Omit<MessageOrmEntity, keyof Model>): MessageOrmEntity;
    static tableName: string;
    chatId: string;
    senderId: string;
    type: MessageType;
    status: MessageStatus;
    text?: string | null;
    fileKey?: string | null;
    fileName?: string | null;
    fileWeight?: number | null;
    systemMessageType?: SystemMessageType | null;
    contractData?: ISystemMessageOrmData | null;
    chat?: ChatOrmEntity;
    static relationMappings: RelationMappingsThunk;
}
