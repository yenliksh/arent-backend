import { ISystemMessageOrmData, MessageStatus, MessageType, SystemMessageType } from '@domains/message/domain/types';
import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { Model } from 'objection';
declare type IMessage = Omit<MessageOrmEntity, keyof Model>;
export declare class MessageTypeormEntity implements IMessage {
    id: string;
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
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
export {};
